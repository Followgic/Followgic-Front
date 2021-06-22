import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MagoService } from 'src/app/services/mago.service';
import { AmigosComponent } from '../amigos.component';

@Component({
  selector: 'app-confirmar-eliminacion',
  templateUrl: './confirmar-eliminacion.component.html',
  styleUrls: ['./confirmar-eliminacion.component.css']
})
export class ConfirmarEliminacionComponent implements OnInit {


  constructor(private magoService: MagoService ,public dialogRef: MatDialogRef<AmigosComponent>, @Inject(MAT_DIALOG_DATA) public data: {id: number, nombre:String}) { }

  ngOnInit(): void {
  }

    
  

  eliminarAmigo(){
    this.magoService.eliminarAmigo(this.data.id).subscribe(res=>{
      this.dialogRef.close();
      })
  }

}
