import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'etc-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  board: any = [];

  constructor(){
  }

  ngOnInit(){
    for (let r = 0; r < 10; r++) {
      let row = [];
      for (let c = 0; c < 20; c++) {
        row.push(r.toString() + '-' + c.toString());
      }
      this.board.push(row);
    }
  }

}
