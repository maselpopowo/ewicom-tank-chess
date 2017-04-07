import { inject, TestBed } from "@angular/core/testing";
import { MockBackend } from "@angular/http/testing";
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from "@angular/http";

import { BoardTemplateService } from "./board-template.service";
import { SquareType } from "./square-type.enum";
import { Square } from "./square";
import { BoardTemplate } from "./board-template.interface";
import { SquareJson } from "./square-json.interface";
import { PieceJson } from "../piece/piece-json.interface";
import { Piece } from "../piece/piece";
import { Direction } from "../piece/direction.enum";

describe('BoardTemplateService', () =>{
  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BoardTemplateService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) =>{
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  it('should create service', inject([BoardTemplateService], (service: BoardTemplateService) =>{
    expect(service).toBeTruthy();
  }));

  it('should parse json to SquareJson interface', () =>{
    let json: SquareJson = JSON.parse("{\"type\": 1}");

    expect(json.type).toEqual(1);
  })

  it('should parse SquareJson to Square', () =>{
    let square: Square = Square.fromJson({type: 1});

    expect(square.getId()).toBeDefined();
    expect(square.getType()).toEqual(SquareType.GRASS);
  })

  it('should return json board template as BoardTemplate',
    inject([BoardTemplateService, MockBackend], (service, http) =>{
      http.connections.subscribe((connection) =>{
        connection.mockRespond(new Response(new ResponseOptions({
          body: {
            "width": 2,
            "height": 2,
            "data": [
              {"type": 0},
              {
                "type": 1,
                "piece": {
                  "name": "tank",
                  "type": "light",
                  "direction": 0,
                  "image": "image-path",
                  "imageDirection": 0,
                  "rangeOfFire": 1,
                  "rangeOfMovement": 2
                }
              },
              {"type": 2},
              {"type": 3}
            ]
          }
        })));
      });

      service.loadTemplate('fake-template').subscribe((template: BoardTemplate) =>{
        expect(template.width).toEqual(2);
        expect(template.height).toEqual(2);
        expect(template.data).toEqual([
          jasmine.objectContaining({type: SquareType.NONE}),
          jasmine.objectContaining({
            type: SquareType.GRASS,
            piece: jasmine.objectContaining({
              name: "tank",
              type: "light",
              direction: 0,
              image: "image-path",
              imageDirection: 0,
              rangeOfFire: 1,
              rangeOfMovement: 2
            })
          }),
          jasmine.objectContaining({type: SquareType.WATER}),
          jasmine.objectContaining({type: SquareType.ROCK}),
        ]);
        template.data.forEach(square => expect(square.getId()).toBeDefined());
      })
    })
  )

  it('should parse json to PieceJson interface', () =>{
    let json: PieceJson = JSON.parse("{" +
      "\"name\": \"tank\"," +
      "\"type\": \"light\"," +
      "\"direction\": 0," +
      "\"image\": \"image-path\"," +
      "\"imageDirection\": 0," +
      "\"rangeOfFire\": 1," +
      "\"rangeOfMovement\": 2" +
      "}")

    expect(json.name).toEqual("tank")
    expect(json.type).toEqual("light")
    expect(json.direction).toEqual(0)
    expect(json.image).toEqual("image-path")
    expect(json.imageDirection).toEqual(0)
    expect(json.rangeOfFire).toEqual(1)
    expect(json.rangeOfMovement).toEqual(2)
  })

  it('should parce PieceJson to Piece', () =>{
    let piece: Piece = Piece.fromJSON({
      name: "tank",
      type: "light",
      direction: 0,
      image: "image-path",
      imageDirection: 0,
      rangeOfFire: 1,
      rangeOfMovement: 2
    })

    expect(piece.name).toEqual("tank");
    expect(piece.type).toEqual("light");
    expect(piece.getDirection()).toEqual(Direction.UP)
    expect(piece.getImage()).toEqual("image-path")
    expect(piece.getImageDirection()).toEqual(Direction.UP)
    expect(piece.rangeOfFire).toEqual(1)
    expect(piece.rangeOfMovement).toEqual(2)

    expect(piece.getId()).toBeDefined();
  })

  it('should parse Square from SquareJson with Piece', () =>{
    let square: Square = Square.fromJson({
      type: 1,
      piece: {
        name: "tank",
        type: "light",
        direction: 0,
        image: "image-path",
        imageDirection: 0,
        rangeOfFire: 1,
        rangeOfMovement: 2
      }
    })

    expect(square.getId()).toBeDefined();
    expect(square.getType()).toEqual(SquareType.GRASS);

    let piece: Piece = square.getPiece();
    expect(piece.getId()).toBeDefined();
    expect(piece.name).toEqual("tank");
    expect(piece.type).toEqual("light");
    expect(piece.getDirection()).toEqual(Direction.UP)
    expect(piece.getImage()).toEqual("image-path")
    expect(piece.getImageDirection()).toEqual(Direction.UP)
    expect(piece.rangeOfFire).toEqual(1)
    expect(piece.rangeOfMovement).toEqual(2)
  })
});
