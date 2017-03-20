import { Injectable } from "@angular/core";
import { Piece } from "./game-board/piece";
import { Observable, Subject } from "rxjs";
import "rxjs/add/observable/of";

@Injectable()
export class PiecesService {

  pieces: Array<Piece> = [];

  active: Piece;
  activeSubject: Subject<Piece> = new Subject();

  constructor(){
    this.pieces.push(new Piece('Panzerkampfwagen 35(t)', 'Light tank', {r: 3, c: 1}, 180));
    this.pieces.push(new Piece('Panzerkampfwagen 35(t)', 'Light tank', {r: 7, c: 2}, 180));
    this.pieces.push(new Piece('Panzerkampfwagen 35(t)', 'Light tank', {r: 9, c: 2}, 180));
    this.pieces.push(new Piece('Panzerkampfwagen 35(t)', 'Light tank', {r: 4, c: 29}, 0));
    this.pieces.push(new Piece('Panzerkampfwagen 35(t)', 'Light tank', {r: 7, c: 27}, 0));
    this.pieces.push(new Piece('Panzerkampfwagen 35(t)', 'Light tank', {r: 11, c: 28}, 0));
  }

  getPieces(): Observable<Array<Piece>>{
    return Observable.of(this.pieces);
  }

  activate(piece: Piece){
    this.active = piece;
    this.activeSubject.next(this.active);
  }

  getActive(): Observable<Piece>{
    return this.activeSubject.asObservable();
  }

}
