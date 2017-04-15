import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivePlayerComponent } from "./active-player.component";
import { TurnService } from "../turn.service";
import { Observable } from "rxjs";

describe('ActivePlayerComponent', () =>{
  let component: ActivePlayerComponent;
  let fixture: ComponentFixture<ActivePlayerComponent>;

  beforeEach(async(() =>{
    TestBed.configureTestingModule({
      declarations: [
        ActivePlayerComponent
      ],
      providers: [
        {provide: TurnService, useClass: TurnServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() =>{
    fixture = TestBed.createComponent(ActivePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>{
    expect(component).toBeTruthy();
  });
});

class TurnServiceMock {
  getActivePlayer(){
    return Observable.of()
  }
}
