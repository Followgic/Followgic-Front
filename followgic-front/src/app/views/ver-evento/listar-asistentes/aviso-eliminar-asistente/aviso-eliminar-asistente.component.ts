import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { ListarAsistentesComponent } from '../listar-asistentes.component';

@Component({
  selector: 'app-aviso-eliminar-asistente',
  templateUrl: './aviso-eliminar-asistente.component.html',
  styleUrls: ['./aviso-eliminar-asistente.component.css']
})
export class AvisoEliminarAsistenteComponent implements OnInit {

  constructor(private eventoService: EventoService, public dialogRef: MatDialogRef<ListarAsistentesComponent>, @Inject(MAT_DIALOG_DATA) public data: {idEvento: number, mago:any}) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  elimnarUsuarioEvento(idMago){
    this.eventoService.eliminarAsistenteEvento(this.data.idEvento, idMago).subscribe(res => {
      console.log(res)
      this.eventoService.recargarEventos$.emit(idMago)
      this.cerrarDialog()
   
    })
   }

   cerrarDialog(): void {
    this.dialogRef.close();
  }

 


}
