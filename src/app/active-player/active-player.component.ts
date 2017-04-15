import { Component, OnInit } from "@angular/core";
import { TurnService } from "../turn.service";

@Component({
  selector: 'etc-active-player',
  templateUrl: './active-player.component.html',
  styleUrls: ['./active-player.component.scss']
})
export class ActivePlayerComponent implements OnInit {

  private player: string = "player1";

  constructor(private turnService: TurnService){
    this.turnService.getActivePlayer().subscribe(active => this.player = active)
  }

  ngOnInit(){
  }

}
