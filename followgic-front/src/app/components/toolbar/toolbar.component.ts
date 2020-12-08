import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  constructor(public loginService: LoginService, private router: Router) { 

  }

  ngOnInit() {
    
  }


  logout(){
    let mago
    mago=localStorage.getItem('mago');
    localStorage.clear()
    this.loginService.logout(mago)
    this.router.navigate(['/login'])
    
  }



}
