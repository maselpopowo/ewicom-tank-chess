import { Component, OnInit } from "@angular/core";
import { Piece } from "../game-board/piece";

@Component({
  selector: 'etc-piece-info',
  templateUrl: './piece-info.component.html',
  styleUrls: ['./piece-info.component.scss']
})
export class PieceInfoComponent implements OnInit {

  piece: Piece;

  constructor(){
  }

  ngOnInit(){
  }

}
