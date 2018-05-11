import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Router} from '@angular/router';
import {_if} from 'rxjs/observable/if';

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
   // this.firebaseAuth.auth.signInWithPopup(provider);
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }

  logout() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
