import { async, inject, TestBed } from "@angular/core/testing";
import { BoardService } from "./board.service";
import { MOCK_BOARD } from "./board.mock";
import { Square } from "./square";
import { Piece } from "./piece";
import { Observable } from "rxjs";
import { Direction } from "./direction.enum";
import { SquareType } from "./square-type.enum";

describe('BoardService', () =>{

  let initialBoard;

  beforeEach(() =>{
    initialBoard = mockBoard();

    TestBed.configureTestingModule({
      providers: [
        BoardService,
        {provide: MOCK_BOARD, useValue: initialBoard}
      ]
    });
  });

  function mockBoard(){
    let board = [];
    for (let rIndex = 0; rIndex < 5; rIndex++) {
      let row = [];
      for (let cIndex = 0; cIndex < 10; cIndex++) {
        row.push(new Square(SquareType.GRASS));
      }
      board.push(row);
    }

    board[0][1].setPiece(new Piece('name', 'type', Direction.LEFT, 'image-path', Direction.LEFT));
    board[1][2].setPiece(new Piece('name', 'type', Direction.UP, 'image-path', Direction.LEFT));
    board[2][4].setPiece(new Piece('name', 'type', Direction.RIGHT, 'image-path', Direction.LEFT));
    board[3][6].setPiece(new Piece('name', 'type', Direction.DOWN, 'image-path', Direction.LEFT));

    return board;
  }

  it('should create service', inject([BoardService], (service: BoardService) =>{
    expect(service).toBeTruthy();
  }));

  it('should return board as Observable', inject([BoardService], (service: BoardService) =>{
    expect(service.getBoard()).toEqual(jasmine.any(Observable));
  }));

  it('should return next value on refresh', async(inject([BoardService], (service: BoardService) =>{
    service.getBoard().subscribe(board => expect(board).toEqual(initialBoard));

    service.refresh();
  })));

  it('#activeSquare should activate square by ID and refresh board',
    inject([BoardService], (service: BoardService) =>{
      let squareIdToActivate = initialBoard[0][5].getId();

      service.getBoard().subscribe(board =>{
        expect(board[0][5].isActive()).toBeTruthy();
      });

      service.activeSquare(squareIdToActivate);
    })
  );

  it('#activeSquare should call refresh after activation',
    inject([BoardService], (service: BoardService) =>{
      let squareIdToActivate = initialBoard[2][6].getId();
      spyOn(service, 'refresh');

      service.activeSquare(squareIdToActivate);

      expect(service.refresh).toHaveBeenCalled();
    })
  );

  it('#activeSquare should feed active piece if find one in active square',
    inject([BoardService], (service: BoardService) =>{
      let squareIdToActivate = initialBoard[2][0].getId();

      service.getActivePiece().subscribe(piece => expect(piece).toEqual(initialBoard[2][0].getPiece()));

      service.activeSquare(squareIdToActivate);
    })
  );

  it('#getActivePiece should return Observable',
    inject([BoardService], (service: BoardService) =>{
      expect(service.getActivePiece()).toEqual(jasmine.any(Observable));
    })
  );

  describe('#forward', () =>{
    it('should move piece one row backward if direction is UP',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = initialBoard[1][2].getPiece().getId();
        service.getBoard().subscribe((board) =>{
          expect(board[1][2].getPiece()).toBeUndefined();
          expect(board[0][2].getPiece().getId()).toEqual(pieceIdToMove);
        });

        service.forward(pieceIdToMove);
      })
    );

    it('should move piece one row forward if direction is DOWN',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = initialBoard[3][6].getPiece().getId();
        service.getBoard().subscribe((board) =>{
          expect(board[3][6].getPiece()).toBeUndefined();
          expect(board[4][6].getPiece().getId()).toEqual(pieceIdToMove);
        });

        service.forward(pieceIdToMove);
      })
    );

    it('should move piece one column forward if direction is RIGHT',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = initialBoard[2][4].getPiece().getId();
        service.getBoard().subscribe((board) =>{
          expect(board[2][4].getPiece()).toBeUndefined();
          expect(board[2][5].getPiece().getId()).toEqual(pieceIdToMove);
        });

        service.forward(pieceIdToMove);
      })
    );

    it('should move piece one column backward if direction is LEFT',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = initialBoard[0][1].getPiece().getId();
        service.getBoard().subscribe((board) =>{
          expect(board[0][1].getPiece()).toBeUndefined();
          expect(board[0][0].getPiece().getId()).toEqual(pieceIdToMove);
        });

        service.forward(pieceIdToMove);
      })
    );

    it('should feed active piece with empty value after move piece',
      inject([BoardService], (service: BoardService) =>{
        service.getActivePiece().subscribe(piece =>{
          expect(piece).toBeUndefined();
        });

        service.forward('fakePiece');
      })
    );

    it('should call refresh after move',
      inject([BoardService], (service: BoardService) =>{
        spyOn(service, 'refresh');

        service.forward('fakePiece');

        expect(service.refresh).toHaveBeenCalled();
      })
    );

    it('after piece move all squares should be inactive',
      inject([BoardService], (service: BoardService) =>{

        service.getBoard().subscribe(board =>{
          board.forEach(row => row.forEach(col =>{
            expect(col.isActive()).toBeFalsy();
          }))
        });

        service.forward('fakePiece');
      })
    );
  });

  describe('#rotate', () =>{
    it('should change piece direction',
      inject([BoardService], (service: BoardService) =>{

        let pieceToRotate = initialBoard[0][1].getPiece().getId();

        service.getBoard().subscribe(board =>{
          expect(board[0][1].getPiece().getId()).toEqual(pieceToRotate);
          expect(board[0][1].getPiece().getDirection()).toEqual(Direction.DOWN);
        });

        service.rotate(pieceToRotate, Direction.DOWN);
      })
    );

    it('should feed active piece with empty value after rotate piece',
      inject([BoardService], (service: BoardService) =>{
        service.getActivePiece().subscribe(piece =>{
          expect(piece).toBeUndefined();
        });

        service.rotate('fakePiece', Direction.RIGHT);
      })
    );

    it('should call refresh after rotate',
      inject([BoardService], (service: BoardService) =>{
        spyOn(service, 'refresh');

        service.rotate('fakePiece', Direction.RIGHT);

        expect(service.refresh).toHaveBeenCalled();
      })
    );

    it('after piece rotate all squares should be inactive',
      inject([BoardService], (service: BoardService) =>{

        service.getBoard().subscribe(board =>{
          board.forEach(row => row.forEach(col =>{
            expect(col.isActive()).toBeFalsy();
          }))
        });

        service.rotate('fakePiece', Direction.RIGHT);
      })
    );
  });

  describe('#fire', () =>{
    it('should set square as hit one step ahead',
      inject([BoardService], (service: BoardService) =>{
        let idOfShooter = initialBoard[3][6].getPiece().getId();

        service.getBoard().subscribe(board =>{
          expect(board[4][6].isExplosion()).toBeTruthy();
        });

        service.fire(idOfShooter);
      })
    );

    it('should feed active piece with empty value after fire',
      inject([BoardService], (service: BoardService) =>{
        service.getActivePiece().subscribe(piece =>{
          expect(piece).toBeUndefined();
        });

        service.fire('fakePiece');
      })
    );

    it('should call refresh after fire',
      inject([BoardService], (service: BoardService) =>{
        spyOn(service, 'refresh');

        service.fire('fakePiece');

        expect(service.refresh).toHaveBeenCalled();
      })
    );

    it('after fire all squares should be inactive',
      inject([BoardService], (service: BoardService) =>{

        service.getBoard().subscribe(board =>{
          board.forEach(row => row.forEach(col =>{
            expect(col.isActive()).toBeFalsy();
          }))
        });

        service.fire('fakePiece');
      })
    );
  });
});
