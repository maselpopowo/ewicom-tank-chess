import { Piece } from "../piece/piece";
import { SquareType } from "./square-type.enum";
export class Square {

  private id: string;

  private type: SquareType;
  private piece: Piece;

  private active: boolean = false;
  private explosion: boolean = false;

  constructor(type: SquareType){
    this.id = this.generateID();

    this.type = type;
  }

  private generateID(){
    let now = new Date().getUTCMilliseconds();
    let random = Math.floor((Math.random() * 100000) + 1);
    return now.toString() + random.toString();
  }

  getPiece(): Piece{
    return this.piece;
  }

  setPiece(piece: Piece){
    this.piece = piece;
  }

  removePiece(){
    delete this.piece;
  }

  getId(){
    return this.id;
  }

  getType(): SquareType{
    return this.type;
  }

  isActive(): boolean{
    return this.active;
  }

  setActive(state: boolean){
    this.active = state;
  }

  setExplosion(state: boolean){
    this.explosion = state;
  }

  isExplosion(): boolean{
    return this.explosion;
  }
}
