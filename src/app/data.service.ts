import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import {HomeComponent} from './home/home.component';

interface KitchenLocation {
  name: string;
}
@Injectable()
export class DataService {
  appName: any = 'Kitchen-Assist';
  locationCollection: AngularFirestoreCollection<any>;
  locations: Observable<any>;
  locationItemCollection: AngularFirestoreCollection<any>;
  locationItems: Observable<any>;
  currentLocation: Observable<any>;
  locationDoc: AngularFirestoreDocument<any>;
  location: Observable<any>;
  userId: string;
  defaultLocationSet: any = false;

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private authService: AuthService) {
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.getUserDocs(this.userId);
      }
    });
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
    this.setDefaultLocation();
  }
  setDefaultLocation() {
    this.locations = this.locationCollection.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          if (!this.defaultLocationSet) {
            this.defaultLocationSet = true;
            this.setCurrentLocation(id);
          }
          return {id, data};
        });
      });
  }
  setCurrentLocation(locationId) {
    this.locationDoc = this.afs.collection('users').doc(this.userId).collection('locations').doc(locationId);
    this.currentLocation = this.locationDoc.valueChanges();
    this.setLocationItems(locationId);
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
  getLocations() {
    return this.locations;
  }
  getCurrentLocation() {
    return this.currentLocation;
  }
  getLocationItems() {
    return this.locationItems;
  }
  // add location
  addLocation(locationName) {
    this.afs.collection('users').doc(this.userId).collection('locations').add({'name': locationName});
  }
  // delete location by id
  deleteLocation(locationId) {
    this.afs.collection('users').doc(this.userId).collection('locations').doc(locationId).delete();
  }

  // add item to location

  addItem(locationId, locationName, itemName, expirationDate) {
    this.afs.collection('users').doc(this.userId).collection('locations').doc(locationId).collection('Items').add({
      name: itemName,
      expirationDate,
      locationName: locationName,
      locationId
    });
  }
}
