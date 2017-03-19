import { TestBed, inject } from "@angular/core/testing";
import { PieceInfoService } from "./piece-info.service";

describe('PieceInfoService', () =>{
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [PieceInfoService]
    });
  });

  it('should ...', inject([PieceInfoService], (service: PieceInfoService) =>{
    expect(service).toBeTruthy();
  }));
});
