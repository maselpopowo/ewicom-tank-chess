import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaterialModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { SquareComponent } from "./game-board/square.component";
import { BoardService } from "./game-board/board.service";

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    BoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
