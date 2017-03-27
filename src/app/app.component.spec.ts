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

describe('AppComponent', () =>{
  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameBoardComponent,
        SquareComponent,
        PieceInfoComponent,
        PieceComponent
      ],
      imports: [
        MdToolbarModule
      ],
      providers: [
        {provide: BoardService, useClass: BoardServiceMock}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render game name in md-toolbar', async(() =>{
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar span').textContent).toContain('Ewicom Tank Chess');
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
