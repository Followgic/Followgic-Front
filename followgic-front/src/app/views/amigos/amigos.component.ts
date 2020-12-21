import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(public dialog: MatDialog,private magoService: MagoService) {
  this.getAllAmigos()
  
  }

  openDialog(usuario) {
    if(usuario){
   const dialogRef = this.dialog.open(ConfirmarEliminacionComponent, {
     height: '210px',
     width: '300px',
     data: usuario,
     autoFocus: false 
   });

   dialogRef.afterClosed().subscribe(result => {
     this.getAllAmigos()
 
     console.log(`Dialog result: ${result}`);
   });
 }
}
  ngOnInit(): void {
  }

  getAllAmigos(){
    this.magoService.getAllAmigos().subscribe(res =>{
      this.amigos=res
      this.amigosId=this.amigos.map(amigo => amigo.pk)
      this.amigos.forEach((amigo, i) => {
        this.amigos[i].foto = "http://localhost:8000" + amigo.foto  
      });
   
    })
  }

}
