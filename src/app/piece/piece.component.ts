import { Component, OnInit, Input } from "@angular/core";
import { Piece } from "../game-board/piece";
import { PiecesService } from "../pieces.service";

@Component({
  selector: 'etc-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input()
  piece: Piece;

  constructor(private _piecesService: PiecesService){
  }

  ngOnInit(){
  }

  rotation(): string{
    return 'rotate(' + this.piece.rotation + 'deg)';
  }

  activate(){
    this._piecesService.activate(this.piece);
  }

}
