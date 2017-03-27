import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PieceComponent } from "./piece.component";
import { Piece } from "../game-board/piece";
import { Direction } from "../game-board/direction.enum";

describe('PieceComponent', () =>{
  let component: PieceComponent;
  let fixture: ComponentFixture<PieceComponent>;

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [PieceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() =>{
    fixture = TestBed.createComponent(PieceComponent);
    component = fixture.componentInstance;

    let piece = new Piece('name', 'type', Direction.LEFT, 'path-to-image', Direction.RIGHT);
    component.piece = piece;

    fixture.detectChanges();
  });

  it('should create', () =>{
    expect(component).toBeTruthy();
  });
});
