import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Square } from "./square";
import "rxjs/add/observable/of";
import { Piece } from "./piece";

@Injectable()
export class BoardService {

  board: Array<Array<Square>> = [];

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
    return Observable.of(this.board);
  }
}
