export class Piece {
  rotation: string = '0deg';
  name: string = 'Panzerkampfwagen 35(t)';
  type: string = 'Light tank';

  constructor(rotation: string){
    this.rotation = rotation;
  }
}
