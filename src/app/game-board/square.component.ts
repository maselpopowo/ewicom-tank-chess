import { Component, OnInit, Input } from "@angular/core";
import { Square } from "./square.interface";
import { PieceInfoService } from "../piece-info/piece-info.service";

@Component({
  selector: 'etc-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input()
  square: Square = {type: 'NONE'};

  constructor(private _pieceInfoService: PieceInfoService){
  }

  ngOnInit(){
  }

  getBackgroundColor(){
    let color = 'none';
    switch (this.square.type) {
      case 'GRASS':
        color = 'darkgreen';
        break;
      case 'WATER':
        color = 'darkblue';
        break;
      case 'SAND':
        color = 'darkgoldenrod';
        break;
      case 'ROCK':
        color = '#808080';
        break;
      case 'NONE':
        color = 'none';
        break;
    }

    return color;
  }

  getRotation(){
    return this.square.piece ? 'rotate(' + this.square.piece.rotation + ')' : 'rotate(0deg)';
  }

  updateInfo(){
    this._pieceInfoService.setCurrent(this.square.piece);
  }

}
