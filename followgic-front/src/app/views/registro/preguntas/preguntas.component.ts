import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { SuspensoComponent } from '../suspenso/suspenso.component';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntas: any[]=[]
  respuestasCorrectas: any
  numeroPregunta: any;
  error:any;
  @Output()
  aprobado = new EventEmitter();
  @ViewChild('respuesta', { static: false }) respuesta;
  constructor(public dialog: MatDialog,private preguntaService: PreguntaService) {
    this.numeroPregunta = 0
    this.respuestasCorrectas = 0
    this.getPreguntas()
  }

  ngOnInit(): void {
  }


  getPreguntas() {
    this.preguntaService.getPreguntas().subscribe(res => {
  
      this.preguntas = res
    })

  }

  getRespuesta() {
    if (this.respuesta._value) {
      this.error = ''
      if (this.preguntas[this.numeroPregunta].respuesta_correcta == this.respuesta._value[0]) {
        this.respuestasCorrectas = this.respuestasCorrectas + 1
      }

      if (this.numeroPregunta < 4) {
        this.numeroPregunta = this.numeroPregunta + 1
      } else {
        if (this.respuestasCorrectas <= 5 && this.respuestasCorrectas >= 4) {
      
          this.aprobado.emit(true)
        } else {
       
          this.openDialog(this.respuestasCorrectas)
        }

      }
    }else{
     
      this.error = 'Tienes que seleccionar una respuesta'

    }


  }

  openDialog(respuestasCorrectas) {

    const dialogRef = this.dialog.open(SuspensoComponent,  {
      height: '250px',
      width: '400px',
      restoreFocus:false,
      data:respuestasCorrectas ,
      autoFocus: false,
      disableClose: true,
      position: {top:'200px'},
    });

    dialogRef.afterClosed().subscribe(result => {
     
      console.log(`Dialog result: ${result}`);
    });
  }

}
