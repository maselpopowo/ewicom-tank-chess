import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { PieceInfoComponent } from "./piece-info.component";
import { MdCardModule } from "@angular/material";
import { BoardService } from "../game-board/board.service";
import { Observable } from "rxjs";
import { Piece } from "../game-board/piece";
import { Direction } from "../game-board/direction.enum";
import { By } from "@angular/platform-browser";

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

  it('should create PieceInfoComponent', () =>{
    expect(component).toBeTruthy();
  });

  it('should render md card title with piece name', () =>{
    component.piece = new Piece('piece name', 'type', Direction.LEFT, 'image', Direction.LEFT);
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('md-card-title'));
    expect(element.nativeElement.textContent).toEqual('piece name');
  });

  it('should render md card title with no piece info', () =>{
    let element = fixture.debugElement.query(By.css('md-card-title'));
    expect(element.nativeElement.textContent).toEqual('Piece not selected');
  });

  it('should call #forward from BoardService with pieceId when click FORWARD button',
    inject([BoardService], (service: BoardService) =>{
      spyOn(service, 'forward');
      let piece = new Piece('piece name', 'type', Direction.LEFT, 'image', Direction.LEFT);
      component.piece = piece;
      fixture.detectChanges();

      let element = fixture.debugElement.query(By.css('#forward-button'));
      element.triggerEventHandler('click', null);

      expect(service.forward).toHaveBeenCalledWith(piece.getId());
    })
  );

  describe('rotation', () =>{
    let piece = new Piece('piece name', 'type', Direction.LEFT, 'image', Direction.LEFT);

    beforeEach(inject([BoardService], (service: BoardService) =>{
      spyOn(service, 'rotate');
      component.piece = piece;
      fixture.detectChanges();
    }));

    it('should call #rotate method from BoardService with LEFT direction when click LEFT button',
      inject([BoardService], (service: BoardService) =>{
        let element = fixture.debugElement.query(By.css('#left-button'));
        element.triggerEventHandler('click', null);

        expect(service.rotate).toHaveBeenCalledWith(piece.getId(), Direction.LEFT);
      })
    );

    it('should call #rotate method from BoardService with RIGHT direction when click RIGHT button',
      inject([BoardService], (service: BoardService) =>{
        let element = fixture.debugElement.query(By.css('#right-button'));
        element.triggerEventHandler('click', null);

        expect(service.rotate).toHaveBeenCalledWith(piece.getId(), Direction.RIGHT);
      })
    );

    it('should call #rotate method from BoardService with UP direction when click UP button',
      inject([BoardService], (service: BoardService) =>{
        let element = fixture.debugElement.query(By.css('#up-button'));
        element.triggerEventHandler('click', null);

        expect(service.rotate).toHaveBeenCalledWith(piece.getId(), Direction.UP);
      })
    );

    it('should call #rotate method from BoardService with DOWN direction when click DOWN button',
      inject([BoardService], (service: BoardService) =>{
        let element = fixture.debugElement.query(By.css('#down-button'));
        element.triggerEventHandler('click', null);

        expect(service.rotate).toHaveBeenCalledWith(piece.getId(), Direction.DOWN);
      })
    );
  });

  it('should disabled LEFT button if direction is LEFT', () =>{
    component.piece = new Piece('piece name', 'type', Direction.LEFT, 'image', Direction.LEFT);
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#left-button'));
    expect(element.properties['disabled']).toBeTruthy()
  });

  it('should disabled RIGHT button if direction is RIGHT', () =>{
    component.piece = new Piece('piece name', 'type', Direction.RIGHT, 'image', Direction.LEFT);
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#right-button'));
    expect(element.properties['disabled']).toBeTruthy()
  });

  it('should disabled UP button if direction is UP', () =>{
    component.piece = new Piece('piece name', 'type', Direction.UP, 'image', Direction.LEFT);
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#up-button'));
    expect(element.properties['disabled']).toBeTruthy()
  });

  it('should disabled DOWN button if direction is DOWN', () =>{
    component.piece = new Piece('piece name', 'type', Direction.DOWN, 'image', Direction.LEFT);
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#down-button'));
    expect(element.properties['disabled']).toBeTruthy()
  });
});

class BoardServiceMock {
  getActivePiece(){
    return Observable.of();
  }

  forward(){
  }

  rotate(){
  }
}
