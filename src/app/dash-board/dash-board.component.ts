import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {Observable} from 'rxjs/Observable';
import {DataService} from '../data.service';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
  }
}
