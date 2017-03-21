import { Component, OnInit } from "@angular/core";
import { Piece } from "../game-board/piece";
import { BoardService } from "../game-board/board.service";

@Component({
  selector: 'etc-piece-info',
  templateUrl: './piece-info.component.html',
  styleUrls: ['./piece-info.component.scss']
})
export class PieceInfoComponent implements OnInit {

  piece: Piece;

  constructor(private _boardService: BoardService){
  }

  ngOnInit(){
    this._boardService.getActivePiece().subscribe(active => this.piece = active);
  }

  forward(){
    this._boardService.forward(this.piece.id);
  }

  rotateLeft(){
    this._boardService.rotate(this.piece.id, 'LEFT');
  }

  rotateRight(){
    this._boardService.rotate(this.piece.id, 'RIGHT');
  }

}
