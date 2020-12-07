import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    let mago
    mago=localStorage.getItem('mago');
    this.loginService.logout(mago)
    
  }

}
