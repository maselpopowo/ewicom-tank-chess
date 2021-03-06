import { async, TestBed } from "@angular/core/testing";
import { MdToolbarModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { SquareComponent } from "./game-board/square.component";
import { BoardService } from "./game-board/board.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { PieceInfoComponent } from "./piece-info/piece-info.component";
import { PieceComponent } from "./piece/piece.component";
import { TurnService } from "./turn.service";
import { ActivePlayerComponent } from "./active-player/active-player.component";
import { AngularFireAuth } from "angularfire2/auth";

describe('AppComponent', () =>{
  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameBoardComponent,
        SquareComponent,
        PieceInfoComponent,
        PieceComponent,
        ActivePlayerComponent
      ],
      imports: [
        MdToolbarModule
      ],
      providers: [
        {provide: BoardService, useClass: BoardServiceMock},
        {provide: TurnService, useClass: TurnServiceMock},
        {provide: AngularFireAuth, useClass: AngularFireAuthMock}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

class BoardServiceMock {
  getBoard(){
    return Observable.of([]);
  }

  refresh(){
  }

  getActivePiece(){
    return Observable.of();
  }
}

class TurnServiceMock {
  getActivePlayer(){
    return Observable.of()
  }
}

class AngularFireAuthMock {

}
