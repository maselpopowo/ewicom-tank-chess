import { inject, TestBed } from "@angular/core/testing";

import { TurnService } from "./turn.service";
import { Observable } from "rxjs";

describe('TurnService', () =>{
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [TurnService]
    });
  });

  it('should create service', inject([TurnService], (service: TurnService) =>{
    expect(service).toBeTruthy();
  }));

  it('should get active player in tern as Observable',
    inject([TurnService], (service: TurnService) =>{
      expect(service.getActivePlayer()).toEqual(jasmine.any(Observable))
    })
  )

  it('should change active player on next turn',
    inject([TurnService], (service: TurnService) =>{
      let prevPlayer;
      service.getActivePlayer().subscribe(player =>{
        if (prevPlayer) {
          expect(prevPlayer).not.toEqual(player)
        } else {
          prevPlayer = player
        }
      })

      service.nextTurn();
      service.nextTurn();
    })
  )
});
