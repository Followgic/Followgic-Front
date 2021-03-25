import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { VerEventoComponent } from '../ver-evento.component';

@Component({
  selector: 'app-aviso-eliminar-evento',
  templateUrl: './aviso-eliminar-evento.component.html',
  styleUrls: ['./aviso-eliminar-evento.component.css']
})
export class AvisoEliminarEventoComponent implements OnInit {

  constructor(private eventoService: EventoService, public dialogRef: MatDialogRef<VerEventoComponent>, @Inject(MAT_DIALOG_DATA) public data: {idEvento:any}) { }

  ngOnInit(): void {
  
  }

  
 
  eliminarEvento(idEvento){
    this.eventoService.eliminarEvento(idEvento).subscribe(res=>{
      this.eventoService.recargarUltimoComentarioEvento$.emit()
      this.dialogRef.close();
    })
  }

  cancelarDialog(cancelar) {
    this.dialogRef.close(cancelar);


  }


}
