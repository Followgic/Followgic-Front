import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { VerEventoComponent } from '../ver-evento.component';

@Component({
  selector: 'app-aviso-habilitar-mensajes',
  templateUrl: './aviso-habilitar-mensajes.component.html',
  styleUrls: ['./aviso-habilitar-mensajes.component.css']
})
export class AvisoHabilitarMensajesComponent implements OnInit {

  constructor(private eventoService: EventoService, public dialogRef: MatDialogRef<VerEventoComponent>, @Inject(MAT_DIALOG_DATA) public data: {evento:any}) { }

  ngOnInit(): void {
  }

 
  habilitarMensajes(idEvento){
    this.eventoService.habilitarMensajesEvento(idEvento).subscribe(res=>{
      console.log(res)
      this.dialogRef.close();
    })
  }

  cancelarDialog(cancelar) {
    this.dialogRef.close(cancelar);


  }

}
