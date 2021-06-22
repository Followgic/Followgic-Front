import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';
import { MagoService } from 'src/app/services/mago.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { TiempoRealService } from 'src/app/services/tiempo-real.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errores: any = [];
  peticionesRecibidas: any = 0;
  mensajesRecibidos: any = 0;
  constructor(private loginService: LoginService, private mensajeService:MensajeService,private router: Router, private magoService: MagoService, private peticionService: PeticionService , private tiempoRealService: TiempoRealService) {

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.controls.username.value != "" || this.loginForm.controls.password.value != ""){
      this.loginService.login(this.loginForm.value).subscribe(res => {

        
    
        localStorage.setItem('mago', JSON.stringify(this.loginForm.value));
        localStorage.setItem('username',this.loginForm.value.username);
        localStorage.setItem('auth_token', res.auth_token);

       this.getConversancion()
       this.getPeticionesRecibidas()
        this.peticionService.abrirCanal()
        this.tiempoRealService.recargarTiempoReal()
        
      
        this.router.navigate(['/home']);

      },
        err => this.errores = err.error.non_field_errors
      )
    }else{
      this.errores[0]= "No puedes dejar ningún campo vacío"
  }
  }


  getConversancion() {
    this.mensajeService.getMensajesNoLeidos().subscribe(res => {
      this.mensajeService.recargarMenssajesNoLeidos$.emit(res)

    })
  }

  getPeticionesRecibidas() {
    this.peticionService.peticionesRecibidas().subscribe(res => {
      this.peticionService.peticionesRecibidas$.emit(res)

    })
  }

}
