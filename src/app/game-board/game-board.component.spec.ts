import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { GameBoardComponent } from "./game-board.component";
import { SquareComponent } from "./square.component";
import { MdCardModule } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { BoardService } from "./board.service";

describe('GameBoardComponent', () =>{
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        SquareComponent
      ],
      imports: [
        MdCardModule
      ],
      providers: [
        {provide: BoardService, useClass: BoardServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() =>{
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>{
    expect(component).toBeTruthy();
  });
});

class BoardServiceMock {
  getBoard(){
    return Observable.of([]);
  }
}
