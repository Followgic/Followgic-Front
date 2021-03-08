import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { AvisoEliminarAsistenteComponent } from 'src/app/views/ver-evento/listar-asistentes/aviso-eliminar-asistente/aviso-eliminar-asistente.component';

@Component({
  selector: 'app-tarjeta-peticion',
  templateUrl: './tarjeta-peticion.component.html',
  styleUrls: ['./tarjeta-peticion.component.css']
})

export class TarjetaPeticionComponent implements OnInit {
@Input()
peticion:any;
@Output()
recargar = new EventEmitter();

@Input()
amigo:any;

@Input()
mago:any 

@Input()
idEvento:any

@Input()
esCreador:boolean =false
  
  constructor(private magoService: MagoService,public dialog: MatDialog, private peticionService: PeticionService, private eventoService: EventoService) { 
 
  
 
  }

  openDialog(mago) {
    if(this.magoService){
    const dialogRef = this.dialog.open(AvisoEliminarAsistenteComponent, {
      data:{idEvento:this.idEvento, mago:mago},
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log(result)
   
      
      console.log(`Dialog result: ${result}`);
    });
  }
  }

  ngOnInit() {
    if(!this.mago){
      this.getMago()
      }
  }


  getMago(){
    this.magoService.getPerfilAmigo(this.peticion.remitente).subscribe(res =>{
      this.mago=res

     this.mago.foto= 'http://localhost:8000' + this.mago.foto     
     
    
    })
  }

  aceptarPeticion(id){
    this.peticionService.aceptarPeticion(id).subscribe(res =>{
    this.recargar.emit(id)
   
    
    })
  }

  rechazarPeticion(id){
    this.peticionService.rechazarPeticion(id).subscribe(res =>{
    this.recargar.emit(id)
    
    })
  }

  

  elimnarUsuarioEvento(idMago){
   this.eventoService.eliminarAsistenteEvento(this.idEvento, idMago).subscribe(res => {
     console.log(res)
     this.recargar.emit(this.idEvento)
   })
  }

  
  enviarInvitacion(idEvento,idInvitado){
    this.eventoService.generarInvitacion(idEvento,idInvitado).subscribe(res => {
      console.log(res)
      this.recargar.emit(this.idEvento)
    })
  }


  

}
