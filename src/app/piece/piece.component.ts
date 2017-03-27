import { Component, Input, OnInit } from "@angular/core";
import { Piece } from "../game-board/piece";

@Component({
  selector: 'etc-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

  @Input()
  piece: Piece;

  constructor(){
  }

  ngOnInit(){
  }

  rotation(): string{
    return `rotate(${this.piece.getRotation()})`;
  }
}
