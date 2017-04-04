import { Square } from "./square";
import { Piece } from "../piece/piece";
import { OpaqueToken } from "@angular/core";
import { Direction } from "../piece/direction.enum";
import { SquareType } from "./square-type.enum";
import { BoardTemplate } from "./board-template.interface";

export let MOCK_BOARD = new OpaqueToken('etc.board.mock');

export function baseBoard(): BoardTemplate{
  let board: Array<Square> = [];

  for (let i = 0; i < 450; i++) {
    board.push(new Square(SquareType.GRASS));
  }

  board[64].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT));
  board[93].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT));

  let longShooter = new Piece('Panzerkampfwagen 35(t)', 'Long shooter', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT);
  longShooter.setRangeOfFire(3);
  board[154].setPiece(longShooter);

  board[111].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT));

  let tourist = new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT);
  tourist.rangeOfMovement = 3;
  board[144].setPiece(tourist);

  board[178].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT));

  return {
    width: 30,
    height: 15,
    data: board
  }
}
