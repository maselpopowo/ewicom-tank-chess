import { Component, OnInit } from "@angular/core";
import { PiecesService } from "../pieces.service";
import { Piece } from "../game-board/piece";

@Component({
  selector: 'etc-piece-info',
  templateUrl: './piece-info.component.html',
  styleUrls: ['./piece-info.component.scss']
})
export class PieceInfoComponent implements OnInit {

  piece: Piece;

  constructor(private _piecesService: PiecesService){
  }

  ngOnInit(){
    this._piecesService.getActive().subscribe(active => this.piece = active);
  }

}
