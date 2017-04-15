import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class TurnService {

  private player: string = "player1";

  private activePlayer: Subject<any> = new Subject();

  constructor(){
  }

  getActivePlayer(): Observable<any>{
    return this.activePlayer.asObservable();
  }

  nextTurn(){
    this.player === "player1" ? this.player = "player2" : this.player = "player1";
    this.activePlayer.next(this.player);
  }

}
