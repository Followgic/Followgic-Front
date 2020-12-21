import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListarMagosComponent } from '../listar-magos.component';

@Component({
  selector: 'app-aviso-peticion',
  templateUrl: './aviso-peticion.component.html',
  styleUrls: ['./aviso-peticion.component.css']
})
export class AvisoPeticionComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<ListarMagosComponent>, @Inject(MAT_DIALOG_DATA) public data: {nombre: string}) { }

  ngOnInit(): void {
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }
}
