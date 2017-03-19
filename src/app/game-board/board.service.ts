import { Injectable } from "@angular/core";
import { Square } from "./square.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

@Injectable()
export class BoardService {

  board: Array<Array<Square>> = [];

  constructor(){
    for (let r = 0; r < 15; r++) {
      let row = [];
      for (let c = 0; c < 30; c++) {
        row.push({type: 'GRASS', piece: false});
      }
      this.board.push(row);
    }

    this.board[7][4] = {type: 'SAND', piece: false};
    this.board[8][4] = {type: 'SAND', piece: false};
    this.board[9][4] = {type: 'SAND', piece: false};
    this.board[10][4] = {type: 'SAND', piece: false};

    this.board[4][20] = {type: 'WATER', piece: false};
    this.board[4][21] = {type: 'WATER', piece: false};
    this.board[4][22] = {type: 'WATER', piece: false};
    this.board[5][20] = {type: 'WATER', piece: false};
    this.board[5][21] = {type: 'WATER', piece: false};
    this.board[5][22] = {type: 'WATER', piece: false};

    this.board[12][15] = {type: 'ROCK', piece: false};
    this.board[12][16] = {type: 'ROCK', piece: false};
    this.board[12][17] = {type: 'ROCK', piece: false};
    this.board[13][15] = {type: 'ROCK', piece: false};
    this.board[14][15] = {type: 'ROCK', piece: false};

    this.board[13][0] = {type: 'NONE', piece: false};
    this.board[13][1] = {type: 'NONE', piece: false};
    this.board[13][2] = {type: 'NONE', piece: false};
    this.board[13][3] = {type: 'NONE', piece: false};
    this.board[13][4] = {type: 'NONE', piece: false};
    this.board[14][0] = {type: 'NONE', piece: false};
    this.board[14][1] = {type: 'NONE', piece: false};
    this.board[14][2] = {type: 'NONE', piece: false};
    this.board[14][3] = {type: 'NONE', piece: false};
    this.board[14][4] = {type: 'NONE', piece: false};

    this.board[0][11] = {type: 'NONE', piece: false};
    this.board[0][12] = {type: 'NONE', piece: false};
    this.board[0][13] = {type: 'NONE', piece: false};
    this.board[1][11] = {type: 'NONE', piece: false};
    this.board[1][12] = {type: 'NONE', piece: false};
    this.board[1][13] = {type: 'NONE', piece: false};
    this.board[2][11] = {type: 'NONE', piece: false};
    this.board[2][12] = {type: 'NONE', piece: false};
    this.board[2][13] = {type: 'NONE', piece: false};

    this.board[3][26] = {type: 'GRASS', piece: true};
    this.board[9][27] = {type: 'GRASS', piece: true};
    this.board[13][29] = {type: 'GRASS', piece: true};
  }

  getBoard(): Observable<Array<Array<Square>>>{
    return Observable.of(this.board);
  }

}
