import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Router} from '@angular/router';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {
user: Observable<User>;
uid: string;
  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.firebaseAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
   this.firebaseAuth.auth.signInWithPopup(provider);
  }
  logout() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
