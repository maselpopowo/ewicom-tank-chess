import { Piece } from "./piece";

export class Square {

  type: string = 'NONE';
  piece?: Piece;
  coordinates: any;

  active: boolean = false;

  constructor(row: number, cell: number, type: string){
    this.coordinates = {row: row, cell: cell};
    this.type = type;
  }

  setPiece(piece: Piece){
    this.piece = piece;
  }

  setActive(){
    this.active = true;
  }

  clear(){
    return new Square(this.coordinates.row, this.coordinates.cell, this.type);
  }

  move(){
    let moved = new Square(this.coordinates.row, this.coordinates.cell - 1, this.type);
    moved.setPiece(this.piece);
    return moved;
  }
}
