import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.component.html',
  styleUrls: ['./crear-eventos.component.css']
})
export class CrearEventosComponent implements OnInit {
  eventosForm:FormGroup
  preImagen: string;
  imagen: File;
  tipoEventos:any;
  valorEvento:any;

  constructor() {

    this.tipoEventos = [{valor:0,nombre:'Conferencia'},{valor:1,nombre:'Quedada'}]
    this.valorEvento = 0

    this.eventosForm = new FormGroup({
      titulo: new FormControl(""),
      tipo: new FormControl(""),
      descripcion: new FormControl(""),
      fecha_creacion: new FormControl(""),
      fecha_evento: new FormControl(""),
      hora_evento: new FormControl(""),
      aforo: new FormControl(""),
      link: new FormControl(""),
      foto: new FormControl(""),
    });
   }

  ngOnInit(): void {
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

  seleccionarEvento($event){
    this.eventosForm.controls.tipo.setValue($event.value)
    if( $event.value == 1){
      this.eventosForm.controls.link.setValue("")
      
    }
  }

  pintarVariables(){
    console.log(this.eventosForm.value)
  
  }

}
