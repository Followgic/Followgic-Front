import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { EventoService } from 'src/app/services/evento.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { fechaInferiorActual } from 'src/app/utils/password.validator';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerEventoComponent } from '../ver-evento/ver-evento.component';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MapboxService } from 'src/app/services/mapbox.service';

export interface Modalidad {
  pk: number;
  nombre: string;
}


@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.component.html',
  styleUrls: ['./crear-eventos.component.scss'],
 
})
export class CrearEventosComponent implements OnInit {
  eventosForm: FormGroup  | null = null;
  preImagen: string;
  imagen: File;
  tipoEventos: any;
  valorEvento: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  modalidadControl = new FormControl();
  modalidades:any;
  nombreTodasModalidades: any=[]
  nombreMisModalidades: any =[]
  idMisModalidades:any =[]
  nuevaModalidad:any;
  filteredModalidad: Observable<Modalidad[]>;
  selectable = true;
  removable = true;
  esPrivado= false;
  datosEvento: any;
  direccionForm:FormGroup;
  filteredOptions: any[]

  isLinear = false;
  @ViewChild('modalidadInput') modalidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor( private formBuilder:FormBuilder, private router: Router,private mapboxService: MapboxService,private localizacionService: LocalizacionService,private eventoService: EventoService, private utilidadesService:UtilidadesService, private modalidadesService:ModalidadesService
    , @Optional() @Inject(MAT_DIALOG_DATA) public data:{ idEvento:any;}, public dialog: MatDialog) {
    this.getModalidades( ()=>{
    this.filtroModalidad()})
    this.tipoEventos = [{ valor: 0, nombre: 'Conferencia' }, { valor: 1, nombre: 'Quedada' }]
    this.valorEvento = 0
    
    this.direccionForm = new FormGroup({
      direccion: new FormControl('', Validators.required),
      longitud:new FormControl('', Validators.required),
      latitud: new FormControl('', Validators.required),
      
   });
   
    

  }

  ngOnInit(){
    this.filtroModalidad()
    this.eventosForm = this.formBuilder.group(
      {
        titulo: ["",[Validators.required]],
        tipo: [""],
        descripcion: ["",[Validators.required]],
        fecha_creacion: [""],
        fecha_evento: ["",[Validators.required]],
        hora_evento: ["",[Validators.required]],
        aforo: ["",[Validators.required, Validators.min(2)]],
        link_conferencia: [""],
        foto: [""],
        modalidades:[""],
        comentario:[""],
        privacidad:[""],
        localizacion:[""]
      },
      {
        validators: fechaInferiorActual,
      }
    )
    this.eventosForm.controls.tipo.setValue(0)

    if(this.data){
      this.getEventoPorId(this.data)
    }
 
  }

  
  fechaMayorActual():  boolean  {
    return  this.eventosForm.hasError('noEsMayor')  &&
      this.eventosForm.get('fecha_evento').dirty
     
  }

  getErrorTitulo() {
    if (this.eventosForm.controls.titulo.hasError('required')) {
      return 'Tienes que introducir un título'
    }
  }
  getErrorDescripcion() {
    if (this.eventosForm.controls.descripcion.hasError('required')) {
      return 'Tienes que introducir una descripción'
    }
  }
  getErrorfechaEvento() {
    if (this.eventosForm.controls.fecha_evento.hasError('required')) {
      return 'Tienes que introducir una fecha del evento'
    }
  }
  getErrorHoraEvento() {
    if (this.eventosForm.controls.hora_evento.hasError('required')) {
      return 'Tienes que introducir una hora del evento '
    }
  }
  getErrorAforo() {
    if (this.eventosForm.controls.aforo.hasError('required')) {
      return 'Tienes que introducir un aforo max'
    }
    return 'Tiene que ser igual o superior a 2'
  }


  save() {
    if(!this.eventosForm.invalid){
    this.eventosForm.controls.fecha_evento.setValue(this.utilidadesService.getFechaStrBD(this.eventosForm.value.fecha_evento))
    this.eventosForm.controls.modalidades.setValue(this.idMisModalidades)
    if(this.esPrivado){
      this.eventosForm.controls.privacidad.setValue(1)
    }else{
      this.eventosForm.controls.privacidad.setValue(0)

    }

    this.eventoService.crearEvento(this.eventosForm.value).subscribe(res => {
      this.eventosForm.reset()
      this.nombreMisModalidades=[]
      this.esPrivado=false
     
      if (this.imagen) {
        this.saveImangen(res.pk)
      }else{
        this.eventoService.idEvento$.emit(res.pk)
        this.router.navigate(['/ver-evento']);

      }

    })
  }

  }

  editarEvento(){
    if(this.esPrivado){
      this.eventosForm.controls.privacidad.setValue(1)
    }else{
      this.eventosForm.controls.privacidad.setValue(0)

    }
    if(  typeof this.eventosForm.value.fecha_evento!== 'string' ){
    this.eventosForm.controls.fecha_evento.setValue(this.utilidadesService.getFechaStrBD(this.eventosForm.value.fecha_evento))
    }
    this.eventoService.editarEvento(this.datosEvento.id,this.eventosForm.value).subscribe(res=>{
      console.log(res)
      
      if (this.imagen) {
        this.saveImangen(res.pk)
        this.dialog.closeAll()
      }else{
        this.dialog.closeAll()
      }
    })
  }



  editLocalizacion(){
    if(this.direccionForm.controls.direccion.value){
    let direccionCompleta = this.direccionForm.controls.direccion.value
    this.direccionForm.controls.longitud.setValue(direccionCompleta.center[0])
    this.direccionForm.controls.latitud.setValue(direccionCompleta.center[1])
    this.direccionForm.controls.direccion.setValue(direccionCompleta.place_name)
  
    this.localizacionService.editLocalizacion(this.direccionForm.value, this.datosEvento.localizacion.pk).subscribe(res => {
      this.editarEvento()
    })}else{
      this.editarEvento()
    }
    console.log(this.direccionForm.value)
  
  }
  



  saveImangen(idEvento) {
    const formData = new FormData();
    formData.append('foto', this.imagen);
    this.eventoService.guardarImagen(formData, idEvento).subscribe(res => {
      if(!this.data){
      this.eventoService.idEvento$.emit(res.pk)
      this.router.navigate(['/ver-evento']);
      this.imagen =null
      this.preImagen=" "
      }
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

  seleccionarEvento($event) {
    this.eventosForm.controls.tipo.setValue($event.value)
    if ($event.value == 1) {
      this.eventosForm.controls.link_conferencia.setValue("")

    }
  }

  pintarVariables() {
    console.log(this.eventosForm.value)

  }

 //Metodos para modalidades

 getModalidades(cb?) {
  this.modalidadesService.getModalidades().subscribe(res => {
    this.modalidades = res;
    this.nombreTodasModalidades =  this.modalidades.map(modalidad => modalidad.nombre)
    if(cb){
      cb()
    }
  })

}
add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;
  let modalidad

  // Add our fruit
  if ((value || '').trim()) {
  
    
    modalidad = value.trim().toLowerCase()
    modalidad = modalidad.charAt(0).toUpperCase() + modalidad.slice(1);
    if(!this.nombreMisModalidades.includes(modalidad) && !this.nombreTodasModalidades.includes(modalidad)){
    this.nombreMisModalidades.push(modalidad);
    this.nombreTodasModalidades = this.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
    this.nuevaModalidad= {nombre: modalidad}
    this.createModalidad(this.nuevaModalidad)
    this.getModalidades(()=> {this.misModalidadesId()})
    }else if(this.nombreTodasModalidades.includes(modalidad)){
      this.nombreMisModalidades.push(modalidad);
      this.nombreTodasModalidades = this.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
       this.modalidadControl.setValue(modalidad)
  
      
    }
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }
   this.idMisModalidades = this.modalidades.filter(modalidad=> this.nombreMisModalidades.includes(modalidad.nombre)).map(modalidad => modalidad.pk)
   this.modalidadControl.setValue(null);
}


  remove(modalidad: Modalidad): void {
    const index = this. nombreMisModalidades.indexOf(modalidad);

    if (index >= 0) {
      this.nombreMisModalidades.splice(index, 1);
      this.nombreTodasModalidades = this.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
      this.filtroModalidad()
    }
    this.misModalidadesId()

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.nombreMisModalidades.includes(event.option.viewValue)) {
      this.nombreMisModalidades.push(event.option.viewValue);
      this.nombreTodasModalidades = this.modalidades.map(modalidad => modalidad.nombre).filter(modalidad => !this.nombreMisModalidades.includes(modalidad))
      this.misModalidadesId()
    }
    this.modalidadInput.nativeElement.value = '';
     this.modalidadControl.setValue(null);
    
    

  }

  filtroModalidad() {
    this.filteredModalidad = this.modalidadControl.valueChanges.pipe(
      startWith(null),
      map((modalidad: string | null) => modalidad ? this._filter(modalidad) : this.nombreTodasModalidades.slice()));
  }

  private _filter(nombre: string): string[] {
    const filterValue = nombre.toLowerCase();

    return this.nombreTodasModalidades.filter(modalidad => modalidad.toLowerCase().includes(filterValue));
  }

  createModalidad(modalidad){
    this.modalidadesService.crearModalidad(modalidad).subscribe(res => {
      console.log(res)


    })

  }

  misModalidadesId(){
    this.idMisModalidades = this.modalidades.filter(modalidad=> this.nombreMisModalidades.includes(modalidad.nombre)).map(modalidad => modalidad.pk)
    console.log(this.idMisModalidades)
  }

  getEventoPorId(idEvento){
    this.eventoService.getEventoPorId(idEvento).subscribe(res => {
      this.datosEvento = res
      console.log(this.datosEvento)
      this.eventosForm.setValue({
        titulo: this.datosEvento.titulo,
        tipo: this.datosEvento.tipo,
        descripcion: this.datosEvento.descripcion,
        fecha_creacion: this.datosEvento.fecha_creacion,
        fecha_evento: this.datosEvento.fecha_evento,
        hora_evento: this.datosEvento.hora_evento,
        aforo: this.datosEvento.aforo,
        link_conferencia: this.datosEvento.link_conferencia,
        modalidades: this.datosEvento.modalidades,
        foto: this.datosEvento.foto,
        comentario: this.datosEvento.comentarios,
        privacidad: this.datosEvento.privacidad,
        localizacion: this.datosEvento.localizacion
       
      })
      if(this.datosEvento.localizacion){
        this.direccionForm.controls.direccion.setValue({place_name: this.datosEvento.localizacion.direccion , center:[this.datosEvento.localizacion.longitud,this.datosEvento.localizacion.latitud], pk: this.datosEvento.localizacion.pk})
        this.direccionForm.controls.latitud.setValue(this.datosEvento.localizacion.latitud)
        this.direccionForm.controls.longitud.setValue(this.datosEvento.localizacion.longitud)

     
      }
      if(this.datosEvento.privacidad==0){
        this.esPrivado=false
      }else{
        this.esPrivado=true
      }
      this.preImagen = 'http://localhost:8000' + this.eventosForm.value.foto



      
      
    })
  }

 //select de direccion
 
 saveDireccion(){
  if(this.direccionForm.controls.direccion.value){
  let direccionCompleta = this.direccionForm.controls.direccion.value
  this.direccionForm.controls.longitud.setValue(direccionCompleta.center[0])
  this.direccionForm.controls.latitud.setValue(direccionCompleta.center[1])
  this.direccionForm.controls.direccion.setValue(direccionCompleta.place_name)

  this.localizacionService.crearLocalizacion(this.direccionForm.value).subscribe(res => {
    this.eventosForm.controls.localizacion.setValue(res.pk)
    this.save()
  })}else{
    this.save()
  }
  console.log(this.direccionForm.value)

}

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
