import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MagoService } from 'src/app/services/mago.service';
import { MapboxService } from 'src/app/services/mapbox.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { validarQueSeanIguales } from '../../../utils/password.validator';

export interface Modalidad {
  pk: number;
  nombre: String;
}
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})

export class EditarPerfilComponent implements OnInit {
  perfilForm: FormGroup;
  modalidades: any;
  modalidadesForm: any;
  datosUsuario: any = {}
  preImagen: any;
  imagen: any;
  errores: any=[];
  direccionForm:any;
  filteredOptions: any[]
  constructor( private formBuilder:FormBuilder,private magoService: MagoService,private localizacionService: LocalizacionService ,private mapboxService: MapboxService, private modalidadesService: ModalidadesService, public dialog: MatDialog) {

    this.getMago()
    this.getModalidades()
    
    this.direccionForm = new FormGroup({
      direccion: new FormControl('', Validators.required),
      longitud:new FormControl('', Validators.required),
      latitud: new FormControl('', Validators.required),
      
   });
   


  }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group(
      {
        nombre: ['',[Validators.required,Validators.maxLength(50)]],
        nombre_artistico: ['',[Validators.required,Validators.maxLength(50)]],
        telefono: ['',  [Validators.maxLength(15),Validators.pattern('[+0-9]*')]],
        email: ['',  [Validators.required, Validators.email]],
        pagina_web: ['',Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
        descripcion: ['',Validators.maxLength(1500)],
        username:['',[Validators.required, Validators.pattern('[@,.,+,-,_,a-z,A-Z-0-9]*')]],
        foto:[""],
        modalidades:[""],
        localizacion:[""]
     
      }
    )
  }
  checarSiSonIguales(hola):  boolean  {
    return  this.perfilForm.hasError('noSonIguales')  &&
      this.perfilForm.get('password').dirty &&
      this.perfilForm.get('re_password').dirty;
     
  }

  getErrorPassword() {
    if (this.perfilForm.controls.password.hasError('required')) {
      return 'Tienes que introducir una contraseña'
    }
    return this.perfilForm.controls.password.hasError('minlength') ? 'Tiene que tener más de 8 caracteres' : '';
  }
  getErrorMensaje() {
    if (this.perfilForm.controls.email.hasError('required')) {
      return 'Tienes que introducir un email';
    }

    return this.perfilForm.controls.email.hasError('email') ? 'Este email no es valido' : '';
  }

  getErrorTelefono() {
    if(this.perfilForm.controls.telefono.hasError('maxlength')){
      return'Debe tener menos de 15 caracteres'
    }

    return this.perfilForm.controls.telefono.errors ? 'Este telefono no es valido' : '';
  }


  getErrorUrl() {

    return this.perfilForm.controls.pagina_web.errors ? 'Esta url no es correcta' : '';
  }
  getErrorDescripcion() {

    return this.perfilForm.controls.descripcion.hasError('maxlength') ? 'Tiene que tener menos de 1500 caracteres' : '';
  }

  getErrorNombre() {
    if (this.perfilForm.controls.nombre.hasError('required')) {
      return 'Tienes que introducir un nombre'
    }
    return this.perfilForm.controls.nombre.hasError('maxlength') ? 'Tiene que tener menos de 50 caracteres' : '';
  }

  getErrorNombreArtistico() {
    if (this.perfilForm.controls.nombre_artistico.hasError('required')) {
      return 'Tienes que introducir un nombre artistico'
    }

    return this.perfilForm.controls.nombre.hasError('maxlength') ? 'Tiene que tener menos de 50 caracteres' : '';
  
  }

  getMago() {
    this.magoService.getUsuario().subscribe(res => {
      this.datosUsuario = res;
     
      this.perfilForm.setValue({
        nombre: this.datosUsuario.nombre,
        nombre_artistico: this.datosUsuario.nombre_artistico,
        telefono: this.datosUsuario.telefono,
        email: this.datosUsuario.email,
        foto: this.datosUsuario.foto,
        pagina_web: this.datosUsuario.pagina_web,
        descripcion: this.datosUsuario.descripcion,
        username: this.datosUsuario.username,
        modalidades: this.datosUsuario.modalidades,
        localizacion: this.datosUsuario.localizacion
      })
      if(this.datosUsuario.localizacion){
        this.direccionForm.controls.direccion.setValue({place_name: this.datosUsuario.localizacion.direccion , center:[this.datosUsuario.localizacion.longitud,this.datosUsuario.localizacion.latitud], pk: this.datosUsuario.localizacion.pk})
        this.direccionForm.controls.latitud.setValue(this.datosUsuario.localizacion.latitud)
        this.direccionForm.controls.longitud.setValue(this.datosUsuario.localizacion.longitud)

     
      }
      this.preImagen = 'http://localhost:8000' + this.perfilForm.value.foto


    
    },
      err => console.log(err)
    )
  }

  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;
   
    })

  }
  editLocalizacion(){

    let direccionCompleta = this.direccionForm.controls.direccion.value
    this.direccionForm.controls.longitud.setValue(direccionCompleta.center[0])
    this.direccionForm.controls.latitud.setValue(direccionCompleta.center[1])
    this.direccionForm.controls.direccion.setValue(direccionCompleta.place_name)
  
    this.localizacionService.editLocalizacion(this.direccionForm.value, this.datosUsuario.localizacion.pk).subscribe(res => {
      
    })
    console.log(this.direccionForm.value)
  
  }


  save() {
    const formData = new FormData();
    delete this.perfilForm.value.foto
    delete this.perfilForm.value.localizacion
    this.magoService.editUsuario(this.perfilForm.value).subscribe(res => {
      if (this.imagen) {
        this.saveImangen()
      }
      if(this.direccionForm.controls.direccion.value){
      this.editLocalizacion()
      }
      this.dialog.closeAll()
      
      this.getMago()

    },

    err=> this.errores=err.error




    )

  }



  saveImangen() {
    const formData = new FormData();
    formData.append('foto', this.imagen);
    this.magoService.editImagen(formData).subscribe(res => {
    
      this.getMago()
    })

  }

  onChangeImagen(files: FileList) {
    let fichero = files.item(0)
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      let data = fileReader.result
      this.preImagen = data.toString()
    }
    fileReader.readAsDataURL(fichero)
    this.imagen = fichero;




  }

  //direccion

  displayFn(direccion: any): any {

    return direccion && direccion.place_name ? direccion.place_name : '';
  }
  getDirecciones(direccion){
    if(direccion.currentTarget.value){
    this.mapboxService.getCordenadas(direccion.currentTarget.value).subscribe( res => {
      this.filteredOptions=res.features
    
    })
  }
  }
  


}
