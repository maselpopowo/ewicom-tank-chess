import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Square } from "./square";
import "rxjs/add/observable/of";
import { Piece } from "./piece";
import { Subject } from "rxjs";
import { MOCK_BOARD } from "./board.mock";
import { Direction } from "./direction.enum";

import * as _ from "lodash";
import { BoardTemplate } from "./board-template.interface";

@Injectable()
export class BoardService {

  board: Array<Square> = [];

  boardSubject: Subject<Array<Array<Square>>> = new Subject();

  activePiece: Subject<Piece> = new Subject();

  private boardWidth: number;
  private boardHeight: number;

  constructor(@Inject(MOCK_BOARD) private mockBoard: BoardTemplate){
    this.board = mockBoard.data;

    this.boardWidth = mockBoard.width;
    this.boardHeight = mockBoard.height;
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
    this.findPieceAndApply(pieceId, (piece, index, square) =>{
      this.movePieceInDirection(piece, index, square);
    });

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }

  private movePieceInDirection(piece: Piece, index: number, square: Square){
    let step;
    if (piece.getDirection() === Direction.UP) {
      step = -this.boardWidth;
    }
    if (piece.getDirection() === Direction.DOWN) {
      step = this.boardWidth;
    }
    if (piece.getDirection() === Direction.LEFT) {
      step = -1;
    }
    if (piece.getDirection() === Direction.RIGHT) {
      step = 1;
    }

    this.board[(index + step)].setPiece(piece);
    square.removePiece();
  }

  rotate(pieceId: string, direction: Direction){
    this.findPieceAndApply(pieceId, (piece: Piece) =>{
      piece.setDirection(direction);
    });

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
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
    let isNotLastSquare = () => squares.length < piece.getRangeOfFire();
    let isNotAfterLastColumn = (index: number) => index <= this.getIndexOfLastElementInRow(currentIndex);
    let isNotBeforeFirstColumn = (index: number) => index >= this.getIndexOfFirstElementInRow(currentIndex);
    let isNotBeforeFirstRow = (index: number) => this.getIndexOfCurrentRow(index) >= 0;
    let isNotAfterLastRow = (index: number) => this.getIndexOfCurrentRow(index) <= this.getIndexOfLastRow();

    let startIndex;
    switch (piece.getDirection()) {
      case Direction.RIGHT:
        startIndex = currentIndex + 1;
        for (; isNotLastSquare() && isNotAfterLastColumn(startIndex); startIndex++) {
          squares.push(this.board[startIndex]);
        }
        break
      case Direction.LEFT:
        startIndex = currentIndex - 1;
        for (; isNotLastSquare() && isNotBeforeFirstColumn(startIndex); startIndex--) {
          squares.push(this.board[startIndex]);
        }
        break
      case Direction.UP:
        startIndex = currentIndex - this.boardWidth;
        for (; isNotLastSquare() && isNotBeforeFirstRow(startIndex); startIndex -= this.boardWidth) {
          squares.push(this.board[startIndex]);
        }
        break
      case Direction.DOWN:
        startIndex = currentIndex + this.boardWidth;
        for (; isNotLastSquare() && isNotAfterLastRow(startIndex); startIndex += this.boardWidth) {
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
    return (this.getIndexOfCurrentRow(element) + 1) * this.boardWidth;
  }

  private getIndexOfFirstElementInRow(element: number){
    return this.getIndexOfCurrentRow(element) * this.boardWidth;
  }

  private getIndexOfCurrentRow(element: number){
    return Math.floor(element / this.boardWidth);
  }

  private getIndexOfLastRow(){
    return (this.board.length / this.boardWidth) - 1;
  }

  setPiece(index: number, piece: Piece){
    this.board[index].setPiece(piece);
    this.refresh();
  }
}
