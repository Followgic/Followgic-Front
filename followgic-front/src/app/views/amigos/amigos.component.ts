import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartaComponent } from 'src/app/components/carta/carta.component';
import { MagoService } from 'src/app/services/mago.service';
import { ConfirmarEliminacionComponent } from './confirmar-eliminacion/confirmar-eliminacion.component';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {
  amigosId:any;
  amigos:any =[]
  hayAmigos:boolean = true

  @ViewChild(CartaComponent) carta:CartaComponent;	
  constructor(public dialog: MatDialog,private magoService: MagoService) {
  this.getAllAmigos()
  this.magoService.recargaAmigos$.subscribe(res=> {
    this.amigos = res
    if(res.length==0){
    this.hayAmigos =false
  }else{
    this.hayAmigos =true
  }
    this.amigosId=this.amigos.map(amigo => amigo.pk)
      this.amigos =this.amigos.map(amigo=> {return{ pk: amigo.pk , foto: "http://localhost:8000"
      + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico }})
  })
  
  }

  openDialog(usuario) {
    if(usuario){
   const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
     height: '210px',
     width: '300px',
     data: usuario,
     autoFocus: false, 
     disableClose: true 
   });

   dialogRef.afterClosed().subscribe(result => {
     if(!result){
      this.getAllAmigos()
     }

     console.log(`Dialog result: ${result}`);
   });
 }
}
  ngOnInit(): void {
  }

  getAllAmigos(){
    this.magoService.getAllAmigos().subscribe(res =>{
      this.amigos=res
      if(res.length==0){
      this.hayAmigos =false
      }

      this.amigosId=this.amigos.map(amigo => amigo.pk)
      this.amigos =this.amigos.map(amigo=> {return{ pk: amigo.pk , foto: "http://localhost:8000"
      + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico }})
    /*   this.amigos.forEach((amigo, i) => {
        this.amigos[i].foto = "http://localhost:8000" + amigo.foto  
      }); */
   
    })
  }

}
