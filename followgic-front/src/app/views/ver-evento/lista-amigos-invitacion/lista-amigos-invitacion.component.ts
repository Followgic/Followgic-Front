import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { ListarEventosComponent } from '../../listar-eventos/listar-eventos.component';
import { VerEventoComponent } from '../ver-evento.component';

@Component({
  selector: 'app-lista-amigos-invitacion',
  templateUrl: './lista-amigos-invitacion.component.html',
  styleUrls: ['./lista-amigos-invitacion.component.css']
})
export class ListaAmigosInvitacionComponent implements OnInit {

  constructor(private eventoService: EventoService,public dialogRef: MatDialogRef<VerEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{ amigos:any[], idEvento:any},  public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  cerrarDialog(){
      this.dialogRef.close()
  }

  enviarInvitacion(idEvento,idInvitado){
    this.eventoService.generarInvitacion(idEvento,idInvitado).subscribe(res => {
      console.log(res)
    })
  }

}
