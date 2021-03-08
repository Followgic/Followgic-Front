import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { VerEventoComponent } from '../../ver-evento/ver-evento.component';
import { ListarEventosComponent } from '../listar-eventos.component';

@Component({
  selector: 'app-aviso-inscripcion',
  templateUrl: './aviso-inscripcion.component.html',
  styleUrls: ['./aviso-inscripcion.component.css']
})
export class AvisoInscripcionComponent implements OnInit {

  constructor( private eventoService: EventoService,public dialogRef: MatDialogRef<ListarEventosComponent>,public dialogRef2: MatDialogRef<VerEventoComponent>, @Inject(MAT_DIALOG_DATA) public data: {evento:any}) { }

  ngOnInit(): void {
  }


  cancelarDialog(cancelar) {
    this.dialogRef.close(cancelar);
    this.dialogRef2.close(cancelar);
    
  }

  inscribirEnEvento(idEvento){
    this.eventoService.inscribirseEvento(idEvento).subscribe(res=> {
    this.dialogRef.close();
    this.dialogRef2.close();
    })
  }




}
