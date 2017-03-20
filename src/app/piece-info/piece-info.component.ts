import { Component, OnInit } from "@angular/core";
import { Square } from "../game-board/square";

@Component({
  selector: 'etc-piece-info',
  templateUrl: './piece-info.component.html',
  styleUrls: ['./piece-info.component.scss']
})
export class PieceInfoComponent implements OnInit {

  square: Square;

  constructor(){
  }

  ngOnInit(){
  }

}
