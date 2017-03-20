import { TestBed, inject } from "@angular/core/testing";
import { PiecesService } from "./pieces.service";

describe('PiecesService', () =>{
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [PiecesService]
    });
  });

  it('should ...', inject([PiecesService], (service: PiecesService) =>{
    expect(service).toBeTruthy();
  }));
});
