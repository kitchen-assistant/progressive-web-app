import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import { LoginComponent} from '../login/login.component';
import {NgClass} from '@angular/common';
import {document} from 'ngx-bootstrap/utils/facade/browser';
import index from '@angular/cli/lib/cli';
import {DataService} from '../data.service';

interface KitchenLocation {
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appName = 'Kitchen-Assist';
  locations: any;
  locationItems: any;
  currentLocation: any;
  userId: string;
  navChangeVisible: any = false;
  dashboardView: any = true;
  locationView: any= false;
  itemView: any = false;

  constructor(public authService: AuthService, private afs: AngularFirestore, private firebaseAuth: AngularFireAuth, private router: Router, private loginComponent: LoginComponent, private dataService: DataService) {
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.dataService.getUserDocs(this.userId);
        this.locations = this.dataService.getLocations();
      }
    });
  }
  ngOnInit() {
  }
setCurrentLocation(locationId) {
    this.dataService.setCurrentLocation(locationId);
    this.currentLocation = this.dataService.getCurrentLocation();
}

  logout() {
    this.loginComponent.logout();
  }

  activate(id) {
    const divs = document.querySelectorAll('.menuItem');
    let i;
    for ( i = 0; i < divs.length; ++i) {
      divs[i].style.backgroundColor = 'transparent';
    }
    document.getElementById(id).style.backgroundColor = 'aqua';
    if (id === 'one'){
      this.dashboardView = true;
      this.locationView = false;
      this.itemView = false;
    }
    if (id === 'two') {
      this.locationView = true;
      this.dashboardView = false;
      this.itemView = false;
    }if ( id === 'three') {
      this.itemView = true;
      this.dashboardView = false;
      this.locationView = false;
    }
  }
  activeLocation(id) {
    const divs = document.querySelectorAll('.navLocationLink');
    let i;
    for ( i = 0; i < divs.length; ++i) {
      divs[i].style.color = '#797979';
    }
    document.getElementById(id).style.color = 'aqua';
  }
}

  // resetForm(form: NgForm) {
  //   form.reset();
  // }



