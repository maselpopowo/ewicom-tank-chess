import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Square } from "./square";

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
    let color = 'NONE';
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

    return this.square.active ? 'red' : color;
  }

  activate(){
    this.squareActivated.emit(this.square.id);
  }
}
