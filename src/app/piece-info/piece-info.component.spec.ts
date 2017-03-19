import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PieceInfoComponent } from "./piece-info.component";

describe('PieceInfoComponent', () =>{
  let component: PieceInfoComponent;
  let fixture: ComponentFixture<PieceInfoComponent>;

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [PieceInfoComponent]
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
