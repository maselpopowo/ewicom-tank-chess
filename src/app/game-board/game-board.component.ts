import { Component, OnInit } from "@angular/core";
import { Square } from "./square";
import { BoardService } from "./board.service";
import { Piece } from "./piece";
import { PiecesService } from "../pieces.service";

@Component({
  selector: 'etc-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  board: Array<Array<Square>> = [];

  pieces: Array<Piece> = [];

  constructor(private _boardService: BoardService,
              private _piecesService: PiecesService){
  }

  ngOnInit(){
    this._boardService.getBoard().subscribe(board => this.board = board);
    this._piecesService.getPieces().subscribe(pieces => this.pieces = pieces);
  }

  showPiece(r: number, c: number): boolean{
    return this.pieces.map(piece => piece.coordinates).some(cor => (cor.r === r) && (cor.c === c));
  }

  getPiece(r: number, c: number): Piece{
    return this.pieces.find(piece => piece.coordinates.r == r && piece.coordinates.c == c);
  }

}
