import { Component, OnInit } from "@angular/core";
import { Square } from "./square.interface";
import { BoardService } from "./board.service";

@Component({
  selector: 'etc-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  board: Array<Array<Square>> = [];

  constructor(private _boardService: BoardService){
  }

  ngOnInit(){
    this._boardService.getBoard().subscribe(board => this.board = board);
  }

}
