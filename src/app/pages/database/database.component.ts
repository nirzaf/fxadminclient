import { Component, OnInit } from '@angular/core';
import {AuthGuardService} from "../../shared/services/auth-guard.service";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
}
