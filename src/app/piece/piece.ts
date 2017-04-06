import { Direction } from "./direction.enum";
export class Piece {
  private id: string;
  name: string;
  type: string;

  private direction: Direction;

  private image: string;
  private imageDirection: Direction;

  private _rangeOfFire: number = 1;
  private _rangeOfMovement: number = 1;

  constructor(name: string, type: string, direction: Direction, image: string, imageDirection: Direction){
    this.id = this.generateID();

    this.name = name;
    this.type = type;
    this.direction = direction;
    this.image = image;
    this.imageDirection = imageDirection;
  }

  private generateID(){
    let now = new Date().getMilliseconds();
    let random = Math.floor((Math.random() * 1000000) + 1);
    return (now + random).toString();
  }

  getId(): string{
    return this.id;
  }

  getRotation(): string{
    let difference = this.imageDirection - this.direction;
    if (difference === 0) {
      return '0deg';
    } else if (difference === 3 || difference === -1) {
      return '90deg';
    } else if (difference === 2 || difference === -2) {
      return '180deg';
    } else if (difference === -3 || difference === 1) {
      return '-90deg';
    }
  }

  getImage(): string{
    return this.image;
  }

  getDirection(): Direction{
    return this.direction;
  }

  setDirection(newDirection: Direction){
    this.direction = newDirection;
  }

  get rangeOfFire(): number{
    return this._rangeOfFire;
  }

  set rangeOfFire(value: number){
    this._rangeOfFire = value;
  }

  get rangeOfMovement(): number{
    return this._rangeOfMovement;
  }

  set rangeOfMovement(value: number){
    this._rangeOfMovement = value;
  }
}
