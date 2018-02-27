import { Component } from '@angular/core';
import {AuthService} from './auth.service';

import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService, private firebaseAuth: AngularFireAuth) {
      this.firebaseAuth.authState.subscribe(user => {
        if (user) {
          const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          };
        }
      });
  }
}
