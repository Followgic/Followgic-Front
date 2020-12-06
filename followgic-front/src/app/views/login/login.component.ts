import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private loginService: LoginService, private router: Router) { 

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   });

  }

  ngOnInit(): void {
  }

  login(){
/*     this.loginForm.controls.password = CryptoJS.AES.encrypt(this.user.password.trim(), this.llaveEncripcion.trim()).toString();
    console.log(this.user.password) */

    this.loginService.login(this.loginForm.controls.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', JSON.stringify(this.loginForm.controls.value));
        this.router.navigate(['/home']);

      },
      err => console.log(err)
    )
  }

}
