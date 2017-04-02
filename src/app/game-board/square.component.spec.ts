import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SquareComponent } from "./square.component";
import { PieceComponent } from "../piece/piece.component";
import { Square } from "./square";
import { SquareType } from "./square-type.enum";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe('SquareComponent', () =>{
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  let expectedSquare = new Square(SquareType.GRASS);
  let squareElement: DebugElement;

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
    squareElement = fixture.debugElement.query(By.css('.square'));

    component.square = expectedSquare;

    fixture.detectChanges();
  });

  it('should create square component', () =>{
    expect(component).toBeTruthy();
  });

  it('should raise squareActivated event with square id when click', () =>{
    let selectedSquareId: string = '';

    component.squareActivated.subscribe((squareId: string) => selectedSquareId = squareId);

    squareElement.triggerEventHandler('click', null);
    expect(selectedSquareId).toEqual(expectedSquare.getId());
  });

  it('should change background color to red if square is active', () =>{
    let square = new Square(SquareType.ROCK);
    square.setActive(true);
    component.square = square;
    fixture.detectChanges();

    expect(squareElement.styles['background-color']).toEqual('red');
  });

  it('square with NONE type should have none color', () =>{
    component.square = new Square(SquareType.NONE);
    fixture.detectChanges();

    expect(squareElement.styles['background-color']).toEqual('none');
  });

  it('square with GRASS type should have darkgreen color', () =>{
    component.square = new Square(SquareType.GRASS);
    fixture.detectChanges();

    expect(squareElement.styles['background-color']).toEqual('darkgreen');
  });

  it('square with WATER type should have darkblue color', () =>{
    component.square = new Square(SquareType.WATER);
    fixture.detectChanges();

    expect(squareElement.styles['background-color']).toEqual('darkblue');
  });

  it('square with ROCK type should have #808080 color', () =>{
    component.square = new Square(SquareType.ROCK);
    fixture.detectChanges();

    expect(squareElement.styles['background-color']).toEqual('#808080');
  });

  it('square with SAND type should have darkgoldenrod color', () =>{
    component.square = new Square(SquareType.SAND);
    fixture.detectChanges();

    expect(squareElement.styles['background-color']).toEqual('darkgoldenrod');
  });

  it('square with explosion set should show image', () =>{
    let square = new Square(SquareType.ROCK);
    square.setExplosion(true);
    component.square = square;
    fixture.detectChanges();

    let image = fixture.debugElement.nativeElement.querySelector('img');
    expect(image).not.toBeNull()
  })
});
