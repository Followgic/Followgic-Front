import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeticionService } from 'src/app/services/peticion.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { environment } from 'src/environments/environment';
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
mensajes:any=[]
invitacionesEventos:any=[]
comentariosNoLeidos=0

urlImagen = environment.url_img
  constructor(private peticionService: PeticionService,private eventoService: EventoService,private mensajeService: MensajeService, private utilidadesService:UtilidadesService) {
   this.getPeticionesRecibidas() 
   this.getInvitacionesEventos()
    this.getMensajesNoLeidos()

    this.peticionService.peticionesRecibidas$.subscribe(res => {
      if(  JSON.stringify(this.peticionesRecibidas) !== JSON.stringify(res)){
       
        this.peticionesRecibidas=res
        this.noNotificacion=""
      }
      if(this.peticionesRecibidas.length==0){
        this.noNotificacion="No tienes ninguna petición"
      }
    })

    this.mensajeService.recargarMenssajesNoLeidos$.subscribe(res => {
      this.mensajesNoLeidos=res



    })

    

  
    
    this.eventoService.recargarInvitacion$.subscribe(res => {
      this.invitacionesEventos=res
      this.eventoService.recargarInvitaciones$.emit(res.length)
      

    console.log(this.invitacionesEventos)

    })

    this.eventoService.comentariosSinLeer$.subscribe(res => {
      if(res==0){
        this.comentariosNoLeidos=0  
      }else{
      this.comentariosNoLeidos= this.comentariosNoLeidos + 1

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

  getInvitacionesEventos(){
    this.eventoService.verMisInvitaciones().subscribe(res =>{
      this.eventoService.recargarInvitaciones$.emit(res.length)
      this.invitacionesEventos = res.map(invitacion => {
        return {
          pk: invitacion.pk, evento: invitacion.evento, fecha: this.utilidadesService.formatearDatos(new Date(invitacion.fecha)), destinatario: invitacion.destinatario, foto: this.urlImagen+invitacion.evento.foto
        }
      })
      console.log(this.invitacionesEventos)

    })
  }

  recargarpagina(id){
    if(id){
      this.getPeticionesRecibidas()
    }
  }
  recargarPaginaInvitacion(id){
    if(id){
      this.getInvitacionesEventos()
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
