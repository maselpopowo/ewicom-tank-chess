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
import { AngularFireModule } from "angularfire2";

export const firebaseConfig = {
  apiKey: "AIzaSyA9sKRTd6s2AOj6Km-7USMeBmXHa2fpTsg",
  authDomain: "tank-chess-dev.firebaseapp.com",
  databaseURL: "https://tank-chess-dev.firebaseio.com",
  projectId: "tank-chess-dev",
  storageBucket: "tank-chess-dev.appspot.com",
  messagingSenderId: "272840136761"
};

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
    MdListModule,
    AngularFireModule.initializeApp(firebaseConfig)
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
