import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Piece } from "./piece";
import { Square } from "./square";
import "rxjs/add/observable/of";

@Injectable()
export class BoardService {

  board: Array<Array<Square>> = [];

  selected: Subject<Square> = new Subject();

  subject: Subject<Array<Array<Square>>> = new Subject();

  constructor(){
    for (let r = 0; r < 15; r++) {
      let row = [];
      for (let c = 0; c < 30; c++) {
        row.push(new Square(r, c, 'GRASS'));
      }
      this.board.push(row);
    }

    this.board[7][4] = new Square(7, 4, 'SAND');
    this.board[8][4] = new Square(8, 4, 'SAND');
    this.board[9][4] = new Square(9, 4, 'SAND');
    this.board[10][4] = new Square(10, 4, 'SAND');

    this.board[4][20] = new Square(4, 20, 'WATER');
    this.board[4][21] = new Square(4, 21, 'WATER');
    this.board[4][22] = new Square(4, 22, 'WATER');
    this.board[5][20] = new Square(5, 20, 'WATER');
    this.board[5][21] = new Square(5, 21, 'WATER');
    this.board[5][22] = new Square(5, 22, 'WATER');

    this.board[12][15] = new Square(12, 15, 'ROCK');
    this.board[12][16] = new Square(12, 16, 'ROCK');
    this.board[12][17] = new Square(12, 17, 'ROCK');
    this.board[13][15] = new Square(13, 15, 'ROCK');
    this.board[14][15] = new Square(14, 15, 'ROCK');

    this.board[13][0] = new Square(13, 0, 'NONE');
    this.board[13][1] = new Square(13, 1, 'NONE');
    this.board[13][2] = new Square(13, 2, 'NONE');
    this.board[13][3] = new Square(13, 3, 'NONE');
    this.board[13][4] = new Square(13, 4, 'NONE');
    this.board[14][0] = new Square(14, 0, 'NONE');
    this.board[14][1] = new Square(14, 1, 'NONE');
    this.board[14][2] = new Square(14, 2, 'NONE');
    this.board[14][3] = new Square(14, 3, 'NONE');
    this.board[14][4] = new Square(14, 4, 'NONE');

    this.board[0][11] = new Square(0, 11, 'NONE');
    this.board[0][12] = new Square(0, 12, 'NONE');
    this.board[0][13] = new Square(0, 13, 'NONE');
    this.board[1][11] = new Square(1, 11, 'NONE');
    this.board[1][12] = new Square(1, 12, 'NONE');
    this.board[1][13] = new Square(1, 13, 'NONE');
    this.board[2][11] = new Square(2, 11, 'NONE');
    this.board[2][12] = new Square(2, 12, 'NONE');
    this.board[2][13] = new Square(2, 13, 'NONE');

    this.board[3][26] = new Square(3, 26, 'GRASS');
    this.board[9][27] = new Square(9, 27, 'GRASS');
    this.board[13][29] = new Square(13, 29, 'GRASS');
    this.board[3][26].setPiece(new Piece('0deg'));
    this.board[9][27].setPiece(new Piece('0deg'));
    this.board[13][29].setPiece(new Piece('0deg'));

    this.board[4][0] = new Square(4, 0, 'GRASS');
    this.board[7][3] = new Square(7, 3, 'GRASS');
    this.board[11][4] = new Square(11, 4, 'GRASS');
    this.board[4][0].setPiece(new Piece('180deg'));
    this.board[7][3].setPiece(new Piece('180deg'));
    this.board[11][4].setPiece(new Piece('180deg'));
  }

  getBoard(): Observable<Array<Array<Square>>>{
    return this.subject.asObservable();
  }

  refresh(){
    this.subject.next(this.board);
  }

  setActive(square: Square){
    this.setInactive();
    this.board[square.coordinates.row][square.coordinates.cell].setActive();
    this.subject.next(this.board);
    this.selected.next(square);
  }

  private setInactive(){
    for (let r = 0; r < 15; r++) {
      for (let c = 0; c < 30; c++) {
        this.board[r][c].active = false;
      }
    }
  }

  getSelected(): Observable<Square>{
    return this.selected.asObservable();
  }

}
