import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { RegistroService } from 'src/app/services/registro.service';
import { validarQueSeanIguales } from '../../utils/password.validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup | null = null;
  modalidades: any;
  errores:any =[]
  loginForm:FormGroup;
  
  constructor( private formBuilder:FormBuilder, private loginService: LoginService,private registroService: RegistroService, private modalidadesService: ModalidadesService, private router: Router) {
    this.getModalidades()
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   });


  }

  ngOnInit() {
    this.registroForm = this.formBuilder.group(
      {
        nombre: ['',[Validators.required,Validators.maxLength(50)]],
        nombre_artistico: ['',[Validators.required,Validators.maxLength(50)]],
        telefono: ['',  [Validators.maxLength(15),Validators.pattern('[+0-9]*')]],
        email: ['',  [Validators.required, Validators.email]],
        pagina_web: ['',Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
        descripcion: [''],
        username:['',[Validators.required, Validators.pattern('[@,.,+,-,_,a-z,A-Z-0-9]*')]],
        password: ["", [Validators.required,Validators.minLength(8)]],
        re_password: ["", Validators.required],
      },
      {
        validators: validarQueSeanIguales,
      }
    )

 
  }

  checarSiSonIguales():  boolean  {
    return  this.registroForm.hasError('noSonIguales')  &&
      this.registroForm.get('password').dirty &&
      this.registroForm.get('re_password').dirty;
     
  }
  getErrorPassword() {
    if (this.registroForm.controls.password.hasError('required')) {
      return 'Tienes que introducir una contraseña'
    }
    return this.registroForm.controls.password.hasError('minlength') ? 'Tiene que tener más de 8 caracteres' : '';
  }



  getErrorMensaje() {
    if (this.registroForm.controls.email.hasError('required')) {
      return 'Tienes que introducir un email';
    }

    return this.registroForm.controls.email.hasError('email') ? 'Este email no es valido' : '';
  }

  getErrorTelefono() {
    if(this.registroForm.controls.telefono.hasError('maxlength')){
      return'Debe tener menos de 15 caracteres'
    }

    return this.registroForm.controls.telefono.errors ? 'Este telefono no es valido' : '';
  }

  getErrorUrl() {

    return this.registroForm.controls.pagina_web.errors ? 'Esta url no es correcta' : '';
  }

  getErrorUsername() {
    if(this.registroForm.controls.username.hasError('required')){
      return'Tienes que introducir un username'
    }

    return this.registroForm.controls.username.errors ? 'Puede estar compuesto por números,letras y @ . + - _' : '';
  }
  getErrorNombre() {
    if (this.registroForm.controls.nombre.hasError('required')) {
      return 'Tienes que introducir un nombre'
    }
    return this.registroForm.controls.nombre.hasError('maxlength') ? 'Tiene que tener menos de 50 caracteres' : '';
  }

  getErrorNombreArtistico() {
    if (this.registroForm.controls.nombre_artistico.hasError('required')) {
      return 'Tienes que introducir un nombre artistico'
    }

    return this.registroForm.controls.nombre.hasError('maxlength') ? 'Tiene que tener menos de 50 caracteres' : '';
  
  }


  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;
      console.log(res)
    })

  }

  saveRegistro() {
    this.registroService.registro(this.registroForm.value).subscribe(res => {
     
      this.loginForm.controls.username.setValue(this.registroForm.controls.username.value)
      this.loginForm.controls.password.setValue(this.registroForm.controls.password.value)
      this.loginService.login(this.loginForm.value).subscribe( res => {
          localStorage.setItem('mago', JSON.stringify(this.loginForm.value));
          localStorage.setItem('auth_token', res.auth_token)
          this.router.navigate(['/home']);
        } )
    },
      err=> this.errores=err.error
    
    )

  }

}
