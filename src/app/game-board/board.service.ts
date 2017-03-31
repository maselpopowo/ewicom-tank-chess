import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Square } from "./square";
import "rxjs/add/observable/of";
import { Piece } from "./piece";
import { Subject } from "rxjs";
import { MOCK_BOARD } from "./board.mock";
import { Direction } from "./direction.enum";

@Injectable()
export class BoardService {

  board: Array<Array<Square>> = [];

  boardSubject: Subject<Array<Array<Square>>> = new Subject();

  activePiece: Subject<Piece> = new Subject();

  private boardWidth: number;
  private boardHeight: number;

  constructor(@Inject(MOCK_BOARD) private mockBoard: Array<Array<Square>>){
    this.board = mockBoard;

    this.boardWidth = this.board[0].length;
    this.boardHeight = this.board.length;
  }

  getBoard(): Observable<Array<Array<Square>>>{
    return this.boardSubject.asObservable();
  }

  refresh(){
    this.boardSubject.next(this.board);
  }

  activeSquare(squareId: string){
    this.board.forEach(row => row.forEach((square) =>{
      square.setActive(false);
      if (square.getId() === squareId) {
        square.setActive(true);
        this.activePiece.next(square.getPiece());
      }
    }));
    this.refresh();
  }

  private inactiveAll(){
    this.board.forEach(row => row.forEach((square) =>{
      square.setActive(false);
      //square.setExplosion(false);
    }));
  }

  private removeExplosionForAll(){
    this.board.forEach(row => row.forEach((square) =>{
      square.setExplosion(false);
    }));
  }

  getActivePiece(): Observable<Piece>{
    return this.activePiece.asObservable();
  }

  forward(pieceId: string){
    let pieceMoved = false;
    for (let rIndex = 0; rIndex < this.board.length; rIndex++) {
      let row = this.board[rIndex];

      let cIndex = 0;
      while (!pieceMoved && cIndex < row.length) {
        let square = row[cIndex];
        let piece = square.getPiece();
        if (piece && piece.getId() === pieceId) {
          let r = 0;
          let c = 0;
          if (piece.getDirection() === Direction.UP) {
            r = -1;
          }
          if (piece.getDirection() === Direction.DOWN) {
            r = 1;
          }
          if (piece.getDirection() === Direction.LEFT) {
            c = -1;
          }
          if (piece.getDirection() === Direction.RIGHT) {
            c = 1;
          }

          this.board[(rIndex + r)][(cIndex + c)].setPiece(piece);
          square.removePiece();
          pieceMoved = true;
        }
        cIndex++;
      }
    }

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }

  rotate(pieceId: string, direction: Direction){
    this.board.forEach(row =>{

      for (let cIndex = 0; cIndex < row.length; cIndex++) {
        let square = row[cIndex];
        let piece = square.getPiece();
        if (piece && piece.getId() == pieceId) {
          piece.setDirection(direction)
        }
      }

    });
    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }

  fire(pieceId: string){
    this.removeExplosionForAll();

    let explosionInserted = false;
    for (let rIndex = 0; rIndex < this.board.length; rIndex++) {
      let row = this.board[rIndex];

      let cIndex = 0;
      while (!explosionInserted && cIndex < row.length) {
        let square = row[cIndex];
        let piece = square.getPiece();
        if (piece && piece.getId() === pieceId) {
          let squares = [];
          let rangeOfFire = piece.getRangeOfFire();
          if (piece.getDirection() === Direction.UP) {
            let step = rIndex - 1;
            while (step >= (rIndex - rangeOfFire) && step >= 0) {
              squares.push(this.board[step][cIndex]);
              step--
            }
          }
          if (piece.getDirection() === Direction.DOWN) {
            let step = rIndex + 1;
            while (step <= (rIndex + rangeOfFire) && step <= (this.boardHeight - 1)) {
              squares.push(this.board[step][cIndex]);
              step++
            }
          }
          if (piece.getDirection() === Direction.LEFT) {
            let step = cIndex - 1;
            while (step >= (cIndex - rangeOfFire) && step >= 0) {
              squares.push(this.board[rIndex][step]);
              step--
            }
          }
          if (piece.getDirection() === Direction.RIGHT) {
            let step = cIndex + 1;
            while (step <= (cIndex + rangeOfFire) && step <= (this.boardWidth - 1)) {
              squares.push(this.board[rIndex][step]);
              step++
            }
          }

          let pieceFinded = false;
          squares.forEach((s: Square, index: number) =>{
            if (s.getPiece() && !pieceFinded) {
              s.removePiece();
              s.setExplosion(true);
              pieceFinded = true;
            }

            if (index === (squares.length - 1) && !pieceFinded) {
              s.setExplosion(true);
            }
          });

          explosionInserted = true;
        }
        cIndex++;
      }
    }

    this.activePiece.next();
    this.inactiveAll();
    this.refresh();
  }

  setPiece(row: number, column: number, piece: Piece){
    this.board[row][column].setPiece(piece);
    this.refresh();
  }


}
