import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Square } from "./square";
import "rxjs/add/observable/of";
import { Piece } from "../piece/piece";
import { Subject } from "rxjs";
import { Direction } from "../piece/direction.enum";

import * as _ from "lodash";
import { BoardTemplate } from "./board-template.interface";
import { BoardTemplateService } from "./board-template.service";
import { TurnService } from "../turn.service";

@Injectable()
export class BoardService {

  board: Array<Square> = [];

  boardSubject: Subject<Array<Array<Square>>> = new Subject();

  activePiece: Subject<Piece> = new Subject();

  private boardWidth: number;
  private boardHeight: number;

  constructor(private templateService: BoardTemplateService,
              private turnService: TurnService){
    this.templateService.loadTemplate("/assets/templates/boards/base.board.json")
      .subscribe((template: BoardTemplate) =>{
        this.board = template.data;

        this.boardWidth = template.width;
        this.boardHeight = template.height;

        this.refresh()
      });
  }

  getBoard(): Observable<Array<Array<Square>>>{
    return this.boardSubject.asObservable();
  }

  refresh(){
    this.boardSubject.next(_.chunk(this.board, this.boardWidth));
  }

  activeSquare(squareId: string){
    this.board.forEach((square: Square) =>{
      square.setActive(false);
      if (square.getId() === squareId) {
        square.setActive(true);
        this.activePiece.next(square.getPiece());
      }
    });

    this.refresh();
  }

  private inactiveAll(){
    this.board.forEach((square: Square) =>{
      square.setActive(false);
    });
  }

  private removeExplosionForAll(){
    this.board.forEach((square: Square) =>{
      square.setExplosion(false);
    });
  }

  getActivePiece(): Observable<Piece>{
    return this.activePiece.asObservable();
  }

  forward(pieceId: string){
    this.movePiece(pieceId);

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
    this.turnService.nextTurn();
  }

  private movePiece(pieceId: string){
    this.findPieceAndApply(pieceId, (piece, index, sourceSquare) =>{
      let destinationSquare = this.findDestinationSquareToMove(piece, index);
      if (BoardService.isSquareEnabledToMove(destinationSquare)) {
        destinationSquare.setPiece(piece);
        sourceSquare.removePiece();
      }
    });
  }

  canMove(pieceId: string): boolean{
    let destinationSquare: Square = undefined;

    this.findPieceAndApply(pieceId, (piece, index) =>{
      destinationSquare = this.findDestinationSquareToMove(piece, index);
    });

    return BoardService.isSquareEnabledToMove(destinationSquare);
  }

  private static isSquareEnabledToMove(square: Square){
    return _.isUndefined(square) ? false : _.isUndefined(square.getPiece());
  }

  private findDestinationSquareToMove(piece: Piece, source: number): Square{
    let step;
    let condition;

    let isNotOutsideSourceRow = (index: number) =>{
      return this.isNotBeforeFirstInRow(index, source) && this.isNotAfterLastInRow(index, source)
    }

    let rangeOfMovement = piece.rangeOfMovement;
    if (piece.getDirection() === Direction.UP) {
      step = -this.boardWidth * rangeOfMovement;
      condition = (destination: number) => this.isNotOutOfBounds(destination);
    }
    if (piece.getDirection() === Direction.DOWN) {
      step = this.boardWidth * rangeOfMovement;
      condition = (destination: number) => this.isNotOutOfBounds(destination);
    }
    if (piece.getDirection() === Direction.LEFT) {
      step = -rangeOfMovement;
      condition = isNotOutsideSourceRow
    }
    if (piece.getDirection() === Direction.RIGHT) {
      step = rangeOfMovement;
      condition = isNotOutsideSourceRow;
    }

    let destination = source + step;
    if (condition(destination)) {
      return this.board[destination];
    }
  }

  rotate(pieceId: string, direction: Direction){
    this.findPieceAndApply(pieceId, (piece: Piece) =>{
      piece.setDirection(direction);
    });

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
    this.turnService.nextTurn()
  }

  fire(pieceId: string){
    this.removeExplosionForAll();

    this.findPieceAndApply(pieceId, (piece: Piece, index: number) =>{
      let squares = this.getSquaresToSetHit(piece, index);
      this.removeFirstFoundPiece(squares);
    });

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
    this.turnService.nextTurn()
  }

  private findPieceAndApply(pieceId: string, callback: (piece: Piece, index: number, square: Square) => void){
    let notFound = true;
    for (let i = 0; i < this.board.length && notFound; i++) {
      let square = this.board[i];
      let piece = square.getPiece();
      if (piece && piece.getId() === pieceId) {
        callback(piece, i, square);
        notFound = false;
      }
    }
  }

  private getSquaresToSetHit(piece: Piece, currentIndex: number): Square[]{
    let squares = [];
    let isNotLastSquare = () => squares.length < piece.rangeOfFire;

    let startIndex;
    switch (piece.getDirection()) {
      case Direction.RIGHT:
        startIndex = currentIndex + 1;
        for (; isNotLastSquare() && this.isNotAfterLastInRow(startIndex, currentIndex); startIndex++) {
          squares.push(this.board[startIndex]);
        }
        break
      case Direction.LEFT:
        startIndex = currentIndex - 1;
        for (; isNotLastSquare() && this.isNotBeforeFirstInRow(startIndex, currentIndex); startIndex--) {
          squares.push(this.board[startIndex]);
        }
        break
      case Direction.UP:
        startIndex = currentIndex - this.boardWidth;
        for (; isNotLastSquare() && this.isNotOutOfBounds(startIndex); startIndex -= this.boardWidth) {
          squares.push(this.board[startIndex]);
        }
        break
      case Direction.DOWN:
        startIndex = currentIndex + this.boardWidth;
        for (; isNotLastSquare() && this.isNotOutOfBounds(startIndex); startIndex += this.boardWidth) {
          squares.push(this.board[startIndex]);
        }
        break
    }
    return squares;
  }

  private removeFirstFoundPiece(squares: Square[]){
    let found = false;
    squares.forEach((s: Square, index: number) =>{
      if (s.getPiece() && !found) {
        s.removePiece();
        s.setExplosion(true);
        found = true;
      }

      if (index === (squares.length - 1) && !found) {
        s.setExplosion(true);
      }
    });
  }

  private getIndexOfLastElementInRow(element: number){
    return ((this.getIndexOfCurrentRow(element) + 1) * this.boardWidth) - 1;
  }

  private getIndexOfFirstElementInRow(element: number){
    return this.getIndexOfCurrentRow(element) * this.boardWidth;
  }

  private getIndexOfCurrentRow(element: number){
    return Math.floor(element / this.boardWidth);
  }

  private isNotOutOfBounds(index: number){
    return index >= 0 && index < this.board.length;
  }

  private isNotAfterLastInRow(index: number, current: number){
    return index <= this.getIndexOfLastElementInRow(current);
  }

  private isNotBeforeFirstInRow(index: number, current: number){
    return index >= this.getIndexOfFirstElementInRow(current);
  }

  setPiece(index: number, piece: Piece){
    this.board[index].setPiece(piece);
    this.refresh();
  }
}
