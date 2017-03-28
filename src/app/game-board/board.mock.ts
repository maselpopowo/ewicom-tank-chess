import { Square } from "./square";
import { Piece } from "./piece";
import { OpaqueToken } from "@angular/core";
import { Direction } from "./direction.enum";
import { SquareType } from "./square-type.enum";

export let MOCK_BOARD = new OpaqueToken('etc.board.mock');

export function baseBoard(){
  let board: Array<Array<Square>> = [];

  for (let r = 0; r < 15; r++) {
    let row = [];
    for (let c = 0; c < 30; c++) {
      row.push(new Square(SquareType.GRASS));
    }
    board.push(row);
  }

  board[7][4] = new Square(SquareType.SAND);
  board[8][4] = new Square(SquareType.SAND);
  board[9][4] = new Square(SquareType.SAND);
  board[10][4] = new Square(SquareType.SAND);

  board[4][20] = new Square(SquareType.WATER);
  board[4][21] = new Square(SquareType.WATER);
  board[4][22] = new Square(SquareType.WATER);
  board[5][20] = new Square(SquareType.WATER);
  board[5][21] = new Square(SquareType.WATER);
  board[5][22] = new Square(SquareType.WATER);

  board[12][15] = new Square(SquareType.ROCK);
  board[12][16] = new Square(SquareType.ROCK);
  board[12][17] = new Square(SquareType.ROCK);
  board[13][15] = new Square(SquareType.ROCK);
  board[14][15] = new Square(SquareType.ROCK);

  board[13][0] = new Square(SquareType.NONE);
  board[13][1] = new Square(SquareType.NONE);
  board[13][2] = new Square(SquareType.NONE);
  board[13][3] = new Square(SquareType.NONE);
  board[13][4] = new Square(SquareType.NONE);
  board[14][0] = new Square(SquareType.NONE);
  board[14][1] = new Square(SquareType.NONE);
  board[14][2] = new Square(SquareType.NONE);
  board[14][3] = new Square(SquareType.NONE);
  board[14][4] = new Square(SquareType.NONE);

  board[0][11] = new Square(SquareType.NONE);
  board[0][12] = new Square(SquareType.NONE);
  board[0][13] = new Square(SquareType.NONE);
  board[1][11] = new Square(SquareType.NONE);
  board[1][12] = new Square(SquareType.NONE);
  board[1][13] = new Square(SquareType.NONE);
  board[2][11] = new Square(SquareType.NONE);
  board[2][12] = new Square(SquareType.NONE);
  board[2][13] = new Square(SquareType.NONE);

  board[3][2].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT));
  board[6][1].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT));
  let longShooter = new Piece('Panzerkampfwagen 35(t)', 'Long shooter', Direction.RIGHT, '/src/assets/tank.png', Direction.LEFT);
  longShooter.setRangeOfFire(3);
  board[7][2].setPiece(longShooter);
  board[5][29].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT));
  board[6][29].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT));
  board[11][27].setPiece(new Piece('Panzerkampfwagen 35(t)', 'Light tank', Direction.LEFT, '/src/assets/tank.png', Direction.LEFT));

  return board;
}
