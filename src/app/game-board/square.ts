import { Piece } from "./piece";
export class Square {

  id: string;

  type: string;
  piece: Piece;

  constructor(type: string){
    this.id = this.generateID();

    this.type = type;
  }

  private generateID(){
    let now = new Date().getUTCMilliseconds();
    let random = Math.floor((Math.random() * 1000) + 1);
    return now.toString() + random.toString();
  }

  setPiece(piece: Piece){
    this.piece = piece;
  }
}
