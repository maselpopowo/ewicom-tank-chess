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
}
