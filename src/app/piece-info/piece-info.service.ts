import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Piece } from "../game-board/piece";

@Injectable()
export class PieceInfoService {

  current: Subject<Piece> = new Subject();

  constructor(){
  }

  getCurrentPiece(): Observable<Piece>{
    return this.current.asObservable();
  }

  setCurrent(selected: Piece): void{
    this.current.next(selected);
  }

}
