import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Square } from "./square";
import "rxjs/add/observable/of";
import { Piece } from "./piece";
import { Subject } from "rxjs";

@Injectable()
export class BoardService {

  board: Array<Array<Square>> = [];

  boardSubject: Subject<Array<Array<Square>>> = new Subject();

  activePiece: Subject<Piece> = new Subject();

  constructor(){
    for (let r = 0; r < 15; r++) {
      let row = [];
      for (let c = 0; c < 30; c++) {
        row.push(new Square('GRASS'));
      }
      this.board.push(row);
    }

    this.board[7][4] = new Square('SAND');
    this.board[8][4] = new Square('SAND');
    this.board[9][4] = new Square('SAND');
    this.board[10][4] = new Square('SAND');

    this.board[4][20] = new Square('WATER');
    this.board[4][21] = new Square('WATER');
    this.board[4][22] = new Square('WATER');
    this.board[5][20] = new Square('WATER');
    this.board[5][21] = new Square('WATER');
    this.board[5][22] = new Square('WATER');

    this.board[12][15] = new Square('ROCK');
    this.board[12][16] = new Square('ROCK');
    this.board[12][17] = new Square('ROCK');
    this.board[13][15] = new Square('ROCK');
    this.board[14][15] = new Square('ROCK');

    this.board[13][0] = new Square('NONE');
    this.board[13][1] = new Square('NONE');
    this.board[13][2] = new Square('NONE');
    this.board[13][3] = new Square('NONE');
    this.board[13][4] = new Square('NONE');
    this.board[14][0] = new Square('NONE');
    this.board[14][1] = new Square('NONE');
    this.board[14][2] = new Square('NONE');
    this.board[14][3] = new Square('NONE');
    this.board[14][4] = new Square('NONE');

    this.board[0][11] = new Square('NONE');
    this.board[0][12] = new Square('NONE');
    this.board[0][13] = new Square('NONE');
    this.board[1][11] = new Square('NONE');
    this.board[1][12] = new Square('NONE');
    this.board[1][13] = new Square('NONE');
    this.board[2][11] = new Square('NONE');
    this.board[2][12] = new Square('NONE');
    this.board[2][13] = new Square('NONE');

    this.board[3][2].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', 180));
    this.board[6][1].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', 180));
    this.board[7][2].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', 180));
    this.board[5][29].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', 0));
    this.board[6][29].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', 0));
    this.board[11][27].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', 0));
  }

  getBoard(): Observable<Array<Array<Square>>>{
    return this.boardSubject.asObservable();
  }

  refresh(){
    this.boardSubject.next(this.board);
  }

  activeSquare(squareId){
    this.board.forEach(row => row.forEach((square) =>{
      square.active = false;
      if (square.id === squareId) {
        square.active = true;
        this.activePiece.next(square.piece);
      }
    }));
    this.refresh();
  }

  inactiveAll(){
    this.board.forEach(row => row.forEach((square) => square.active = false));
  }

  getActivePiece(): Observable<Piece>{
    return this.activePiece.asObservable();
  }

  forward(pieceId){
    let pieceMoved = false;
    for (let rIndex = 0; rIndex < this.board.length; rIndex++) {
      let row = this.board[rIndex];

      let cIndex = 0;
      while (!pieceMoved && cIndex < row.length) {
        let square = row[cIndex];
        let piece = square.piece;
        if (piece && piece.id == pieceId) {
          let r = 0;
          let c = 0;
          if (piece.rotation == 90) {
            r = -1;
          }
          if (piece.rotation == 270) {
            r = 1;
          }
          if (piece.rotation == 0) {
            c = -1;
          }
          if (piece.rotation == 180) {
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

  rotate(pieceId, direction){
    this.board.forEach(row =>{

      for (let cIndex = 0; cIndex < row.length; cIndex++) {
        let square = row[cIndex];
        let piece = square.piece;
        if (piece && piece.id == pieceId) {
          piece.rotate(direction)
        }
      }

    });
    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }
}
