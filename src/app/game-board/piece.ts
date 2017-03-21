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

  rotate(direction){
    let rotations = [0, 90, 180, 270];
    let actualIndex = rotations.indexOf(this.rotation);
    switch (direction) {
      case 'LEFT':
        if (actualIndex == 0) {
          this.rotation = rotations[3];
        } else {
          this.rotation = rotations[actualIndex - 1];
        }
        break;
      case 'RIGHT':
        if (actualIndex == 3) {
          this.rotation = rotations[0];
        } else {
          this.rotation = rotations[actualIndex + 1];
        }
        break;
    }
  }
}
