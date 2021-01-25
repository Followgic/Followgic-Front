import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { AmigosComponent } from '../../amigos/amigos.component';
import { ListarMagosComponent } from '../listar-magos.component';

@Component({
  selector: 'app-aviso-cancelar-peticion',
  templateUrl: './aviso-cancelar-peticion.component.html',
  styleUrls: ['./aviso-cancelar-peticion.component.css']
})
export class AvisoCancelarPeticionComponent implements OnInit {

  constructor(private peticionService: PeticionService ,public dialogRef: MatDialogRef<ListarMagosComponent>, @Inject(MAT_DIALOG_DATA) public data: {id: number, nombre:String}) { }

  ngOnInit(): void {
  }

  
  cerrarDialog(): void {
    this.dialogRef.close();
  }

  cancelarPeticion(){
    this.peticionService.peticionPendienteConUsuario(this.data.id).subscribe(res=>{
     let idPeticion = res.pk
    
     this.eliminarPeticion(idPeticion)
      })
  }

  eliminarPeticion(id){
    this.peticionService.cancelarPeticion(id).subscribe(res=>{
     
      this.cerrarDialog()
      })
  }

}
