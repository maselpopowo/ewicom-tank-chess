import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PieceInfoComponent } from "./piece-info.component";
import { MdCardModule } from "@angular/material";
import { BoardService } from "../game-board/board.service";
import { Observable } from "rxjs";

describe('PieceInfoComponent', () =>{
  let component: PieceInfoComponent;
  let fixture: ComponentFixture<PieceInfoComponent>;

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        PieceInfoComponent
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
    fixture = TestBed.createComponent(PieceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>{
    expect(component).toBeTruthy();
  });
});

class BoardServiceMock {
  getActivePiece(){
    return Observable.of();
  }
}
