import { Component, OnInit } from "@angular/core";
import { BoardService } from "../game-board/board.service";
import { Square } from "../game-board/square";

@Component({
  selector: 'etc-piece-info',
  templateUrl: './piece-info.component.html',
  styleUrls: ['./piece-info.component.scss']
})
export class PieceInfoComponent implements OnInit {

  square: Square;

  constructor(private _boardService: BoardService){
  }

  ngOnInit(){
    this._boardService.getSelected().subscribe(selected => this.square = selected);
  }

  move(){
  }

}
