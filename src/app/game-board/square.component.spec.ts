import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SquareComponent } from "./square.component";
import { PieceComponent } from "../piece/piece.component";
import { Square } from "./square";
import { SquareType } from "./square-type.enum";

describe('SquareComponent', () =>{
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        SquareComponent,
        PieceComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() =>{
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;

    let square = new Square(SquareType.GRASS);
    component.square = square;

    fixture.detectChanges();
  });

  it('should create', () =>{
    expect(component).toBeTruthy();
  });
});
