import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { GameBoardComponent } from "./game-board.component";
import { SquareComponent } from "./square.component";
import { MdCardModule } from "@angular/material";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { BoardService } from "./board.service";
import { PieceComponent } from "../piece/piece.component";
import { Square } from "./square";
import { SquareType } from "./square-type.enum";

describe('GameBoardComponent', () =>{
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let expectedSquare: Square = new Square(SquareType.GRASS);

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        SquareComponent,
        PieceComponent
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
    component.board = [[expectedSquare]];
    fixture.detectChanges();
  });

  it('should create GameBoardComponent', () =>{
    expect(component).toBeTruthy();
  });

  it('should call activeSquare from BoardService on activeSquare ',
    inject([BoardService], (boardService: BoardService) =>{
      spyOn(boardService, 'activeSquare');

      component.activeSquare('squareId');

      expect(boardService.activeSquare).toHaveBeenCalledWith('squareId');
    })
  );
});

class BoardServiceMock {
  getBoard(){
    return Observable.of([]);
  }

  refresh(){
  }

  activeSquare(){
  }
}
