import { Component } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";

import * as firebase from "firebase/app";

@Component({
  selector: 'etc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth){
    this.user = afAuth.authState;
  }

  loginAsPlayer1(){
    this.afAuth.auth.signInWithEmailAndPassword('player1@ewicom.org', 'player12345');
  }

  loginAsPlayer2(){
    this.afAuth.auth.signInWithEmailAndPassword('player2@ewicom.org', 'player12345');
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
