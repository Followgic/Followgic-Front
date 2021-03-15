import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { VerEventoComponent } from '../ver-evento.component';

@Component({
  selector: 'app-aviso-silenciar-mensajes',
  templateUrl: './aviso-silenciar-mensajes.component.html',
  styleUrls: ['./aviso-silenciar-mensajes.component.css']
})
export class AvisoSilenciarMensajesComponent implements OnInit {

  constructor(private eventoService: EventoService, public dialogRef: MatDialogRef<VerEventoComponent>, @Inject(MAT_DIALOG_DATA) public data: {evento:any}) { }

  ngOnInit(): void {
  }

  silenciarMensajes(idEvento){
    this.eventoService.silenciarMensajesEvento(idEvento).subscribe(res=> {
      this.eventoService.recargarUltimoComentarioEvento$.emit()
      this.dialogRef.close();
    })
  }

  cancelarDialog(cancelar) {
    this.dialogRef.close(cancelar);


  }


}
