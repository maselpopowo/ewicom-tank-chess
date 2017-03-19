import { Component, OnInit } from "@angular/core";
import { Square } from "./square.interface";

@Component({
  selector: 'etc-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  board: Array<Array<Square>> = [];

  constructor(){
  }

  ngOnInit(){
    for (let r = 0; r < 10; r++) {
      let row = [];
      for (let c = 0; c < 20; c++) {
        row.push({type: 'GRASS'});
      }
      this.board.push(row);
    }
  }

}
