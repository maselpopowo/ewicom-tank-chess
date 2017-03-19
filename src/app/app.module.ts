import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaterialModule } from "@angular/material";
import { AppComponent } from "./app.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { SquareComponent } from "./game-board/square.component";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
