import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  isLinear = false;
  @ViewChild('modalidadInput') modalidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor( private formBuilder:FormBuilder, private router: Router,private eventoService: EventoService, private utilidadesService:UtilidadesService, private modalidadesService:ModalidadesService) {
    this.getModalidades( ()=>{
    this.filtroModalidad()})
    this.tipoEventos = [{ valor: 0, nombre: 'Conferencia' }, { valor: 1, nombre: 'Quedada' }]
    this.valorEvento = 0
    

   
    

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
        privacidad:[""]
      },
      {
        validators: fechaInferiorActual,
      }
    )
    this.eventosForm.controls.tipo.setValue(0)
 
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
      }

    })
  }

  }



  saveImangen(idEvento) {
    const formData = new FormData();
    formData.append('foto', this.imagen);
    this.eventoService.guardarImagen(formData, idEvento).subscribe(res => {
      this.eventoService.idEvento$.emit(res.pk)
      this.router.navigate(['/ver-evento']);
      this.imagen =null
      this.preImagen=" "
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

 
  


}
