import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ListarMagosComponent } from '../../listar-magos/listar-magos.component';

@Component({
  selector: 'app-aviso-preguntas',
  templateUrl: './aviso-preguntas.component.html',
  styleUrls: ['./aviso-preguntas.component.css']
})
export class AvisoPreguntasComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AvisoPreguntasComponent>, private router: Router) {
  //  this.dialogRef.updatePosition({ top: '1000px' });
   }

  ngOnInit(): void {
  }
  cerrarDialog(): void {
    this.dialogRef.close();
  }

  entendido(){
    this.dialogRef.close();
    this.router.navigate(['/registro'])
  }




}
