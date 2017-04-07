import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaterialModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { SquareComponent } from "./game-board/square.component";
import { BoardService } from "./game-board/board.service";
import { PieceInfoComponent } from "./piece-info/piece-info.component";
import { PieceComponent } from "./piece/piece.component";
import { BoardTemplateService } from "./game-board/board-template.service";

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    SquareComponent,
    PieceInfoComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    BoardService,
    BoardTemplateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
