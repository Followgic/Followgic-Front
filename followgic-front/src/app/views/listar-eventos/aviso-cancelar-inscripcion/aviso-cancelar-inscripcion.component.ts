import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { ListaEventosInscritosComponent } from '../../lista-eventos-inscritos/lista-eventos-inscritos.component';
import { VerEventoComponent } from '../../ver-evento/ver-evento.component';
import { ListarEventosComponent } from '../listar-eventos.component';

@Component({
  selector: 'app-aviso-cancelar-inscripcion',
  templateUrl: './aviso-cancelar-inscripcion.component.html',
  styleUrls: ['./aviso-cancelar-inscripcion.component.css']
})
export class AvisoCancelarInscripcionComponent implements OnInit {

  constructor(private eventoService: EventoService,public dialogRef: MatDialogRef<ListarEventosComponent>,public dialogRef2: MatDialogRef<VerEventoComponent>,
    public dialogRef3: MatDialogRef<ListaEventosInscritosComponent>, @Inject(MAT_DIALOG_DATA) public data: {evento:any}) { }

  ngOnInit(): void {
  }

  cancelarDialog(cancelar) {
    this.dialogRef.close(cancelar);
    this.dialogRef2.close(cancelar);
    this.dialogRef3.close(cancelar);
  }

  desuscribirseEnEvento(idEvento){
    this.eventoService.desuscribirseEvento(idEvento).subscribe(res=> {
    this.dialogRef.close();
    this.dialogRef2.close();
    this.dialogRef3.close();
    })
  }


}
