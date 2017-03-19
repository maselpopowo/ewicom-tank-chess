import { Piece } from "./piece";

export interface Square {
  type: string;
  piece?: Piece;
}
