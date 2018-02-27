import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

import { AngularFireModule} from 'angularfire2';
import { environment} from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {HttpModule} from '@angular/http';
import {routes} from './routes';
import { AuthGuard} from './auth.guard';
import {Observable} from 'rxjs/Observable';
import { DashBoardComponent } from './dash-board/dash-board.component';
import {DataService} from './data.service';
import { LocationViewComponent } from './location-view/location-view.component';
import { ItemViewComponent } from './item-view/item-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashBoardComponent,
    LocationViewComponent,
    ItemViewComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
