import { Piece } from "./piece";
import { Direction } from "./direction.enum";

describe('Piece class', () =>{

  it('should create new piece', () =>{
    let piece = new Piece('name', 'type', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT);
    expect(piece).toBeDefined();
  });

  describe('#getRotation', () =>{
    it('should return 0deg if image direction and piece direction are the same', () =>{
      let piece = new Piece('name', 'type', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT);
      expect(piece.getRotation()).toEqual('0deg');
    });

    it('should return 90deg if image direction is LEFT and piece direction is UP', () =>{
      let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.LEFT);
      expect(piece.getRotation()).toEqual('90deg');
    });

    it('should return 90deg if image direction is UP and piece direction is RIGHT', () =>{
      let piece = new Piece('name', 'type', Direction.RIGHT, '/src/assets/tank.png', Direction.UP);
      expect(piece.getRotation()).toEqual('90deg');
    });

    it('should return 90deg if image direction is RIGHT and piece direction is DOWN', () =>{
      let piece = new Piece('name', 'type', Direction.DOWN, '/src/assets/tank.png', Direction.RIGHT);
      expect(piece.getRotation()).toEqual('90deg');
    });

    it('should return 90deg if image direction is DOWN and piece direction is LEFT', () =>{
      let piece = new Piece('name', 'type', Direction.LEFT, '/src/assets/tank.png', Direction.DOWN);
      expect(piece.getRotation()).toEqual('90deg');
    });

    it('should return -90deg if image direction is UP and piece direction is LEFT', () =>{
      let piece = new Piece('name', 'type', Direction.LEFT, '/src/assets/tank.png', Direction.UP);
      expect(piece.getRotation()).toEqual('-90deg');
    });

    it('should return -90deg if image direction is LEFT and piece direction is DOWN', () =>{
      let piece = new Piece('name', 'type', Direction.DOWN, '/src/assets/tank.png', Direction.LEFT);
      expect(piece.getRotation()).toEqual('-90deg');
    });

    it('should return -90deg if image direction is DOWN and piece direction is RIGHT', () =>{
      let piece = new Piece('name', 'type', Direction.RIGHT, '/src/assets/tank.png', Direction.DOWN);
      expect(piece.getRotation()).toEqual('-90deg');
    });

    it('should return -90deg if image direction is RIGHT and piece direction is UP', () =>{
      let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.RIGHT);
      expect(piece.getRotation()).toEqual('-90deg');
    });

    it('should return 180deg if image direction is LEFT and piece direction is RIGHT', () =>{
      let piece = new Piece('name', 'type', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT);
      expect(piece.getRotation()).toEqual('180deg');
    });

    it('should return 180deg if image direction is RIGHT and piece direction is LEFT', () =>{
      let piece = new Piece('name', 'type', Direction.LEFT, '/src/assets/tank.png', Direction.RIGHT);
      expect(piece.getRotation()).toEqual('180deg');
    });

    it('should return 180deg if image direction is UP and piece direction is DOWN', () =>{
      let piece = new Piece('name', 'type', Direction.DOWN, '/src/assets/tank.png', Direction.UP);
      expect(piece.getRotation()).toEqual('180deg');
    });

    it('should return 180deg if image direction is DOWN and piece direction is UP', () =>{
      let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.DOWN);
      expect(piece.getRotation()).toEqual('180deg');
    });
  });

  it('should return image path', () =>{
    let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.DOWN);
    expect(piece.getImage()).toEqual('/src/assets/tank.png');
  });

  it('should return direction', () =>{
    let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.DOWN);
    expect(piece.getDirection()).toEqual(Direction.UP);
  });

  it('should set direction to image', () =>{
    let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.DOWN);
    piece.setDirection(Direction.DOWN);

    expect(piece.getDirection()).toEqual(Direction.DOWN);
  });

  it('should get piece range of fire', () =>{
    let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.DOWN);
    piece.setRangeOfFire(4);

    expect(piece.getRangeOfFire()).toEqual(4)
  });

  it('should get and set piece range of movement', () =>{
    let piece = new Piece('name', 'type', Direction.UP, '/src/assets/tank.png', Direction.DOWN);
    piece.rangeOfMovement = 4;

    expect(piece.rangeOfMovement).toEqual(4)
  });

});
