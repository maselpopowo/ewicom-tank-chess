import { async, inject, TestBed } from "@angular/core/testing";
import { BoardService } from "./board.service";
import { MOCK_BOARD } from "./board.mock";
import { Square } from "./square";
import { Piece } from "./piece";
import { Observable } from "rxjs";
import { Direction } from "./direction.enum";
import { SquareType } from "./square-type.enum";

import * as _ from "lodash";
import { BoardTemplate } from "./board-template.interface";

describe('BoardService', () =>{

  let initialBoard;
  let boardConfig;

  beforeEach(() =>{
    boardConfig = mockBoard();
    initialBoard = boardConfig.data;

    TestBed.configureTestingModule({
      providers: [
        BoardService,
        {provide: MOCK_BOARD, useValue: boardConfig}
      ]
    });
  });

  function mockBoard(): BoardTemplate{
    let board = [];
    for (let i = 0; i < 50; i++) {
      board.push(new Square(SquareType.GRASS));
    }

    // board[0][1].setPiece(new Piece('name', 'type', Direction.LEFT, 'image-path', Direction.LEFT));
    // board[1][2].setPiece(new Piece('name', 'type', Direction.UP, 'image-path', Direction.LEFT));
    // board[2][4].setPiece(new Piece('name', 'type', Direction.RIGHT, 'image-path', Direction.LEFT));
    // board[3][6].setPiece(new Piece('name', 'type', Direction.DOWN, 'image-path', Direction.LEFT));

    return {
      width: 10,
      height: 5,
      data: board
    };
  }

  it('should create service', inject([BoardService], (service: BoardService) =>{
    expect(service).toBeTruthy();
  }));

  it('should return board as Observable', inject([BoardService], (service: BoardService) =>{
    expect(service.getBoard()).toEqual(jasmine.any(Observable));
  }));

  it('should return next value on refresh', async(inject([BoardService], (service: BoardService) =>{
    service.getBoard().subscribe(board => expect(board).toEqual(_.chunk(initialBoard, boardConfig.width)));

    service.refresh();
  })));

  it('#activeSquare should activate square by ID and refresh board',
    inject([BoardService], (service: BoardService) =>{
      let squareIdToActivate = initialBoard[5].getId();

      service.getBoard().subscribe(board =>{
        expect(board[0][5].isActive()).toBeTruthy();
      });

      service.activeSquare(squareIdToActivate);
    })
  );

  it('#activeSquare should call refresh after activation',
    inject([BoardService], (service: BoardService) =>{
      let squareIdToActivate = initialBoard[5].getId();
      spyOn(service, 'refresh');

      service.activeSquare(squareIdToActivate);

      expect(service.refresh).toHaveBeenCalled();
    })
  );

  it('#activeSquare should feed active piece if find one in active square',
    inject([BoardService], (service: BoardService) =>{
      let squareIdToActivate = initialBoard[2].getId();

      service.setPiece(2, new Piece('name', 'type', Direction.LEFT, 'image-path', Direction.LEFT));
      service.getActivePiece().subscribe(piece => expect(piece).toEqual(initialBoard[2].getPiece()));

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
        let pieceIdToMove = new Piece('name', 'type', Direction.UP, 'image-path', Direction.LEFT);
        service.setPiece(10, pieceIdToMove);

        service.getBoard().subscribe((board) =>{
          expect(board[1][0].getPiece()).toBeUndefined();
          expect(board[0][0].getPiece().getId()).toEqual(pieceIdToMove.getId());
        });

        service.forward(pieceIdToMove.getId());
      })
    );

    it('should move piece one row forward if direction is DOWN',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = new Piece('name', 'type', Direction.DOWN, 'image-path', Direction.LEFT);
        service.setPiece(10, pieceIdToMove);

        service.getBoard().subscribe((board) =>{
          expect(board[1][0].getPiece()).toBeUndefined();
          expect(board[2][0].getPiece().getId()).toEqual(pieceIdToMove.getId());
        });

        service.forward(pieceIdToMove.getId());
      })
    );

    it('should move piece one column forward if direction is RIGHT',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = new Piece('name', 'type', Direction.RIGHT, 'image-path', Direction.LEFT);
        service.setPiece(10, pieceIdToMove);

        service.getBoard().subscribe((board) =>{
          expect(board[1][0].getPiece()).toBeUndefined();
          expect(board[1][1].getPiece().getId()).toEqual(pieceIdToMove.getId());
        });

        service.forward(pieceIdToMove.getId());
      })
    );

    it('should move piece one column backward if direction is LEFT',
      inject([BoardService], (service: BoardService) =>{
        let pieceIdToMove = new Piece('name', 'type', Direction.LEFT, 'image-path', Direction.LEFT);
        service.setPiece(11, pieceIdToMove);

        service.getBoard().subscribe((board) =>{
          expect(board[1][1].getPiece()).toBeUndefined();
          expect(board[1][0].getPiece().getId()).toEqual(pieceIdToMove.getId());
        });

        service.forward(pieceIdToMove.getId());
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

        let pieceToRotate = new Piece('name', 'type', Direction.UP, 'image-path', Direction.LEFT);
        service.setPiece(10, pieceToRotate);

        service.getBoard().subscribe((board) =>{
          expect(board[1][0].getPiece().getId()).toEqual(pieceToRotate.getId())
          expect(board[1][0].getPiece().getDirection()).toEqual(Direction.DOWN);
        });

        service.rotate(pieceToRotate.getId(), Direction.DOWN);
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

    it('should set square as hit with steps ahead calculated from piece range of shot',
      inject([BoardService], (service: BoardService) =>{

        let longShooter = new Piece('long-shooter', 'type', Direction.LEFT, 'img', Direction.LEFT);
        longShooter.setRangeOfFire(3);
        service.setPiece(9, longShooter);

        service.getBoard().subscribe(board =>{
          expect(board[0][6].isExplosion()).toBeTruthy();
        });

        service.fire(longShooter.getId());
      })
    );
  });

  it('should set piece on board',
    inject([BoardService], (service: BoardService) =>{
      let pieceToSet = new Piece('name', 'type', Direction.LEFT, 'image-path', Direction.LEFT);

      service.getBoard().subscribe(board =>{
        expect(board[1][4].getPiece()).toBeDefined();
        expect(board[1][4].getPiece().getId()).toEqual(pieceToSet.getId());
      });

      service.setPiece(14, pieceToSet);
    })
  );

  describe('should remove piece if between shooter and target square is one', () =>{

    let target = new Piece('target', 'type', Direction.LEFT, 'image-path', Direction.LEFT);
    let other = new Piece('other', 'type', Direction.LEFT, 'image-path', Direction.LEFT);
    let shooter = new Piece('shooter', 'type', Direction.LEFT, 'image-path', Direction.LEFT);
    shooter.setRangeOfFire(5);

    it('shoot with left direction',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.LEFT);
        service.setPiece(9, shooter);
        service.setPiece(7, target);

        service.getBoard().subscribe(board =>{
          expect(board[0][7].getPiece()).toBeUndefined();
          expect(board[0][7].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with left direction to maximum range',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.LEFT);
        service.setPiece(9, shooter);
        service.setPiece(4, target);

        service.getBoard().subscribe(board =>{
          expect(board[0][4].getPiece()).toBeUndefined();
          expect(board[0][4].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with right direction',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.RIGHT);
        service.setPiece(7, shooter);
        service.setPiece(9, target);

        service.getBoard().subscribe(board =>{
          expect(board[0][9].getPiece()).toBeUndefined();
          expect(board[0][9].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with right direction to maximum range',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.RIGHT);
        service.setPiece(4, shooter);
        service.setPiece(9, target);

        service.getBoard().subscribe(board =>{
          expect(board[0][9].getPiece()).toBeUndefined();
          expect(board[0][9].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with DOWN direction',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.DOWN);
        service.setPiece(0, shooter);

        service.setPiece(10, target);

        service.getBoard().subscribe(board =>{
          expect(board[1][0].getPiece()).toBeUndefined();
          expect(board[1][0].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with DOWN direction to maximum range',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.DOWN);
        shooter.setRangeOfFire(2);
        service.setPiece(0, shooter);

        service.setPiece(20, target);

        service.getBoard().subscribe(board =>{
          expect(board[2][0].getPiece()).toBeUndefined();
          expect(board[2][0].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with UP direction',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.UP);
        service.setPiece(20, shooter);

        service.setPiece(0, target);

        service.getBoard().subscribe(board =>{
          expect(board[0][0].getPiece()).toBeUndefined();
          expect(board[0][0].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with UP direction to maximum range',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.UP);
        shooter.setRangeOfFire(2);
        service.setPiece(30, shooter);

        service.setPiece(10, target);

        service.getBoard().subscribe(board =>{
          expect(board[1][0].getPiece()).toBeUndefined();
          expect(board[1][0].isExplosion()).toBeTruthy();
        });

        service.fire(shooter.getId());
      })
    );

    it('shoot with up direction should hit only first piece',
      inject([BoardService], (service: BoardService) =>{
        shooter.setDirection(Direction.UP);
        shooter.setRangeOfFire(2);
        service.setPiece(31, shooter);

        service.setPiece(21, target);
        service.setPiece(11, other);

        service.getBoard().subscribe(board =>{
          expect(board[2][1].getPiece()).toBeUndefined();
          expect(board[2][1].isExplosion()).toBeTruthy();
          expect(board[1][1].getPiece().getId()).toEqual(other.getId());
          expect(board[1][1].isExplosion()).toBeFalsy();
        });

        service.fire(shooter.getId());
      })
    );

  });
});
