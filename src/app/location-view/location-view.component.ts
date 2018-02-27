import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import {Observable} from 'rxjs/Observable';
import {DataService} from '../data.service';
import {HomeComponent} from '../home/home.component';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {
  locations: any;
  locationItems: any;
  locationCollection: any;
  locationItemCollection: any;
  userId: string;
  constructor(private authService: AuthService, private firebaseAuth: AngularFireAuth, private afs: AngularFirestore , private dataService: DataService) {
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.getUserDocs(this.userId);
      }
    });
  }

  ngOnInit() {
  }

  getUserDocs(uid) {
    this.locationCollection = this.afs.collection('users').doc(uid).collection('locations');
    this.locations = this.locationCollection.valueChanges();

    this.locations = this.locationCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }
  setLocationItems(locationId) {
    this.locationItemCollection = this.afs.collection('users').doc(this.userId).collection('locations').doc(locationId).collection('Items');
    this.locationItems = this.locationItemCollection.valueChanges();

    this.locationItems = this.locationItemCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return {id, data};
        });
      });
  }
  // delete location by id
  deleteLocation(locationId) {
    this.afs.collection('users').doc(this.userId).collection('locations').doc(locationId).delete();
  }
  // add location
  addLocation(locationName) {
    this.afs.collection('users').doc(this.userId).collection('locations').add({'name': locationName});
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
