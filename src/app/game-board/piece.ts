export class Piece {
  id: string;
  name: string;
  type: string;

  rotation: number;

  constructor(name: string, type: string, rotation: number){
    this.id = this.generateID();

    this.name = name;
    this.type = type;
    this.rotation = rotation;
  }

  private generateID(){
    let now = new Date().getUTCMilliseconds();
    let random = Math.floor((Math.random() * 1000) + 1);
    return now.toString() + random.toString();
  }
}
