import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Square } from "./square";
import { SquareType } from "./square-type.enum";

@Component({
  selector: 'etc-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input()
  square: Square;

  @Output()
  squareActivated: EventEmitter<string> = new EventEmitter();

  constructor(){
  }

  ngOnInit(){
  }

  getBackgroundColor(){
    let color = 'none';
    switch (this.square.getType()) {
      case SquareType.GRASS:
        color = 'darkgreen';
        break;
      case SquareType.WATER:
        color = 'darkblue';
        break;
      case SquareType.SAND:
        color = 'darkgoldenrod';
        break;
      case SquareType.ROCK:
        color = '#808080';
        break;
      case SquareType.NONE:
        color = 'none';
        break;
    }

    return this.square.isActive() ? 'red' : color;
  }

  activate(){
    this.squareActivated.emit(this.square.getId());
  }
}
