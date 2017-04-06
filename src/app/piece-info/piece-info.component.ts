import { Component, OnInit } from "@angular/core";
import { Piece } from "../piece/piece";
import { BoardService } from "../game-board/board.service";
import { Direction } from "../piece/direction.enum";

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

  rotation(): string{
    return `rotate(${this.piece.getRotation()})`;
  }

  forward(){
    this._boardService.forward(this.piece.getId());
  }

  left(){
    this._boardService.rotate(this.piece.getId(), Direction.LEFT);
  }

  right(){
    this._boardService.rotate(this.piece.getId(), Direction.RIGHT);
  }

  up(){
    this._boardService.rotate(this.piece.getId(), Direction.UP);
  }

  down(){
    this._boardService.rotate(this.piece.getId(), Direction.DOWN);
  }

  hasUpDirection(): boolean{
    return this.hasDirection(Direction.UP);
  }

  hasDownDirection(): boolean{
    return this.hasDirection(Direction.DOWN);
  }

  hasLeftDirection(): boolean{
    return this.hasDirection(Direction.LEFT);
  }

  hasRightDirection(): boolean{
    return this.hasDirection(Direction.RIGHT);
  }

  private hasDirection(direction: Direction): boolean{
    return this.piece.getDirection() === direction;
  }

  fire(){
    this._boardService.fire(this.piece.getId());
  }

  canMove(): boolean{
    return this._boardService.canMove(this.piece.getId());
  }

}
