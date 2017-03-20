export class Piece {
  name: string;
  type: string;

  coordinates: any;
  rotation: number;

  constructor(name: string, type: string, coordinates: any, rotation: number){
    this.name = name;
    this.type = type;
    this.coordinates = coordinates;
    this.rotation = rotation;
  }
}
