import { Square } from "./square";
import { Piece } from "./piece";
import { Direction } from "./direction.enum";
import { SquareType } from "./square-type.enum";
describe('Square class', () =>{

  it('should create new Square', () =>{
    let square = new Square(SquareType.GRASS);
    expect(square).toBeDefined();
  });

  it('should get id', () =>{
    let square = new Square(SquareType.GRASS);
    expect(square.getId()).toBeDefined();
  });

  it('should set piece', () =>{
    let piece = new Piece('name', 'type', Direction.LEFT, 'path-to-image', Direction.DOWN);
    let square = new Square(SquareType.GRASS);

    square.setPiece(piece);

    expect(square.getPiece()).toBeDefined();
    expect(square.getPiece().getId()).toEqual(piece.getId());
  });

  it('should get piece', () =>{
    let piece = new Piece('name', 'type', Direction.LEFT, 'path-to-image', Direction.DOWN);
    let square = new Square(SquareType.GRASS);
    square.setPiece(piece);

    expect(square.getPiece()).toBeDefined();
    expect(square.getPiece()).toEqual(jasmine.any(Piece));
    expect(square.getPiece().getId()).toEqual(piece.getId());
  });

  it('should remove piece', () =>{
    let piece = new Piece('name', 'type', Direction.LEFT, 'path-to-image', Direction.DOWN);
    let square = new Square(SquareType.GRASS);
    square.setPiece(piece);
    expect(square.getPiece()).toBeDefined();

    square.removePiece();

    expect(square.getPiece()).toBeUndefined();
  });

  it('should get type', () =>{
    let square = new Square(SquareType.GRASS);
    expect(square.getType()).toEqual(SquareType.GRASS);
  });

  it('should test and set active state', () =>{
    let square = new Square(SquareType.GRASS);

    expect(square.isActive()).toBeFalsy();
    square.setActive(true);
    expect(square.isActive()).toBeTruthy();
  });
});
