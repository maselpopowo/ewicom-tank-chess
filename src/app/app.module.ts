import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MdButtonModule, MdCardModule, MdListModule, MdToolbarModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { SquareComponent } from "./game-board/square.component";
import { BoardService } from "./game-board/board.service";
import { PieceInfoComponent } from "./piece-info/piece-info.component";
import { PieceComponent } from "./piece/piece.component";
import { BoardTemplateService } from "./game-board/board-template.service";
import { ActivePlayerComponent } from "./active-player/active-player.component";
import { TurnService } from "./turn.service";

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    SquareComponent,
    PieceInfoComponent,
    PieceComponent,
    ActivePlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule
  ],
  providers: [
    BoardService,
    BoardTemplateService,
    TurnService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
