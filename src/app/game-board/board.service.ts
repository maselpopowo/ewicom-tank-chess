import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Square } from "./square";
import "rxjs/add/observable/of";
import { Piece } from "./piece";
import { Subject } from "rxjs";
import { MOCK_BOARD } from "./board.mock";
import { Direction } from "./direction.enum";

@Injectable()
export class BoardService {

  board: Array<Array<Square>> = [];

  boardSubject: Subject<Array<Array<Square>>> = new Subject();

  activePiece: Subject<Piece> = new Subject();

  constructor(@Inject(MOCK_BOARD) private mockBoard: Array<Array<Square>>){
    this.board = mockBoard;
  }

  getBoard(): Observable<Array<Array<Square>>>{
    return this.boardSubject.asObservable();
  }

  refresh(){
    this.boardSubject.next(this.board);
  }

  activeSquare(squareId: string){
    this.board.forEach(row => row.forEach((square) =>{
      square.setActive(false);
      if (square.getId() === squareId) {
        square.setActive(true);
        this.activePiece.next(square.getPiece());
      }
    }));
    this.refresh();
  }

  private inactiveAll(){
    this.board.forEach(row => row.forEach((square) =>{
      square.setActive(false);
      //square.setExplosion(false);
    }));
  }

  getActivePiece(): Observable<Piece>{
    return this.activePiece.asObservable();
  }

  forward(pieceId: string){
    let pieceMoved = false;
    for (let rIndex = 0; rIndex < this.board.length; rIndex++) {
      let row = this.board[rIndex];

      let cIndex = 0;
      while (!pieceMoved && cIndex < row.length) {
        let square = row[cIndex];
        let piece = square.getPiece();
        if (piece && piece.getId() === pieceId) {
          let r = 0;
          let c = 0;
          if (piece.getDirection() === Direction.UP) {
            r = -1;
          }
          if (piece.getDirection() === Direction.DOWN) {
            r = 1;
          }
          if (piece.getDirection() === Direction.LEFT) {
            c = -1;
          }
          if (piece.getDirection() === Direction.RIGHT) {
            c = 1;
          }

          this.board[(rIndex + r)][(cIndex + c)].setPiece(piece);
          square.removePiece();
          pieceMoved = true;
        }
        cIndex++;
      }
    }

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }

  rotate(pieceId: string, direction: Direction){
    this.board.forEach(row =>{

      for (let cIndex = 0; cIndex < row.length; cIndex++) {
        let square = row[cIndex];
        let piece = square.getPiece();
        if (piece && piece.getId() == pieceId) {
          piece.setDirection(direction)
        }
      }

    });
    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }

  fire(pieceId: string){
    let explosionInserted = false;
    for (let rIndex = 0; rIndex < this.board.length; rIndex++) {
      let row = this.board[rIndex];

      let cIndex = 0;
      while (!explosionInserted && cIndex < row.length) {
        let square = row[cIndex];
        let piece = square.getPiece();
        if (piece && piece.getId() === pieceId) {
          let r = 0;
          let c = 0;
          if (piece.getDirection() === Direction.UP) {
            r = -1;
          }
          if (piece.getDirection() === Direction.DOWN) {
            r = 1;
          }
          if (piece.getDirection() === Direction.LEFT) {
            c = -1;
          }
          if (piece.getDirection() === Direction.RIGHT) {
            c = 1;
          }

          this.board[(rIndex + r)][(cIndex + c)].setExplosion(true);
          explosionInserted = true;
        }
        cIndex++;
      }
    }

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }


}
