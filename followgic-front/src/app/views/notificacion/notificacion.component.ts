import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeticionService } from 'src/app/services/peticion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
peticionesRecibidas:any[] = [];
noNotificacion:any;
noMensaje:any;
mensajesNoLeidos:any =[];
  constructor(private peticionService: PeticionService,private mensajeService: MensajeService) {
   this.getPeticionesRecibidas() 
    this.getMensajesNoLeidos()

    this.peticionService.peticionesRecibidas$.subscribe(res => {
      if(  JSON.stringify(this.peticionesRecibidas) !== JSON.stringify(res)){
       
        this.peticionesRecibidas=res
      }
      if(this.peticionesRecibidas.length==0){
        this.noNotificacion="No tienes ninguna petición"
      }
    })
  
   }

  ngOnInit() {
  
  }

   getPeticionesRecibidas(){
    this.noNotificacion = ""
    this.peticionService.peticionesRecibidas().subscribe(res =>{
      if(  JSON.stringify(this.peticionesRecibidas) !== JSON.stringify(res)){
       
      this.peticionesRecibidas=res
    }
    if(this.peticionesRecibidas.length==0){
      this.noNotificacion="No tienes ninguna petición"
    }
    })
  
  } 

  recargarpagina(id){
    if(id){
      this.getPeticionesRecibidas()
    }
  }

  getMensajesNoLeidos(){
    this.noMensaje = ""
    this.mensajeService.getMensajesNoLeidos().subscribe(res =>{
      this.mensajesNoLeidos=res
    if(this.mensajesNoLeidos.length==0){
      this.noMensaje="No tienes ningún mensaje sin leer"
    }
    })
  
  }

  

}
