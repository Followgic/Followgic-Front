import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router, public toolbarComponent: ToolbarComponent) { }

  ngOnInit(): void {
  }

}
