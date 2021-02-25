import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-listar-asistentes',
  templateUrl: './listar-asistentes.component.html',
  styleUrls: ['./listar-asistentes.component.css']
})
export class ListarAsistentesComponent implements OnInit {

  constructor(private eventoService: EventoService,@Inject(MAT_DIALOG_DATA) public data:{ magosInscritos:any[], idEvento:any, esCreador:boolean},  public dialog: MatDialog) {

    this.eventoService.recargarEventos$.subscribe(res => {
      if(res){
        this.data.magosInscritos.filter(magosInscritos => magosInscritos)
        var i = this.data.magosInscritos.map(magoInscrito => magoInscrito.pk).indexOf(res);
 
        if ( i !== -1 ) {
          this.data.magosInscritos.splice( i, 1 );
        }
      }
    })
   }

  ngOnInit(): void {
  }

  cerrarDialog(evento){
    if(evento){
      this.dialog.closeAll()
    }


  }

}
