import { Square } from "./square";
export interface BoardTemplate {
  width: number
  height: number;
  data: Array<Square>
}
