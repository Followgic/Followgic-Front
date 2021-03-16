import { Injectable } from '@angular/core';
import { EventoService } from './evento.service';
import { LoginService } from './login.service';
import { MagoService } from './mago.service';
import { MensajeService } from './mensaje.service';
import { PeticionService } from './peticion.service';
import { UtilidadesService } from './utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class TiempoRealService {
  notificationPeticion: any[] = [];
  notificationMensajes: any[] = [];
  varita = {idUsuario:null,dentro:false}

  vistaComentario= {idEvento:null, dentro:false}
  constructor(private loginService: LoginService, private peticionService: PeticionService, private magoService: MagoService, private mensajeService: MensajeService,
    private eventoService:EventoService, private utilidadesService:UtilidadesService ) { }


recargarTiempoReal() {

  this.mensajeService.varita$.subscribe(res => {
    this.varita = res
  })
  this.eventoService.vistaComentario$.subscribe(res => {
    this.vistaComentario = res
  })

  if (this.loginService.logueado()) {

    this.peticionService.messages.subscribe(msg => {
      let mensaje = msg.message.split(" ")
      if (mensaje[0] == "Petición") {
        this.notificationPeticion = []
        this.notificationPeticion.unshift(msg.message);
        this.peticionService.peticionesRecibidas().subscribe(res => {
          this.peticionService.peticionesRecibidas$.emit(res)
        })
        this.peticionService.peticionesPendientes().subscribe(res => {
          this.peticionService.peticiones$.emit(res)
        })

        this.magoService.getAllAmigos().subscribe(res => {
          this.magoService.recargaAmigos$.emit(res)
        })

      } else if (mensaje[0] == "Amigo") {
        this.magoService.getAllAmigos().subscribe(res => {
          this.magoService.recargaAmigos$.emit(res)
        })
        this.mensajeService.getMensajes().subscribe(res => {
          //Se recargan las conversaciones entrantes
          this.mensajeService.recargarConversaciones$.emit(res)
        })

        console.log(this.notificationPeticion)
      } else if (mensaje[0] == "Mensaje" && mensaje[1] == "remitente" && this.varita.dentro==true && this.varita.idUsuario==mensaje[2]) {
        this.mensajeService.getConversacionPorMago(mensaje[2]).subscribe(res => {
          this.mensajeService.recargarMensaje$.emit(res)

        })

        this.mensajeService.getMensajes().subscribe(res => {
          //Se recargan las conversaciones entrantes
          this.mensajeService.recargarConversaciones$.emit(res)
        })
        this.mensajeService.getMensajesNoLeidos().subscribe(res =>{
          this.mensajeService.recargarMenssajesNoLeidos$.emit(res)
        })


      } else if (mensaje[0] == "Mensaje" && mensaje[1] == "remitente") {
        this.mensajeService.getMensajes().subscribe(res => {
          //Se recargan las conversaciones entrantes
          this.mensajeService.recargarConversaciones$.emit(res)
        })
        this.mensajeService.getMensajesNoLeidos().subscribe(res =>{
          this.mensajeService.recargarMenssajesNoLeidos$.emit(res)
        })


      } else if (mensaje[0] == "Mensaje" && mensaje[1] == "destinatario") {
        this.mensajeService.getConversacionPorMago(mensaje[2]).subscribe(res => {
          //Se recargan los mensajes entrantes
          this.mensajeService.recargarMensaje$.emit(res)
        })
     
      

      }else if (mensaje[0] == "Mensaje" && mensaje[1] == "actualizar") {
        this.mensajeService.getMensajesNoLeidos().subscribe(res =>{
          this.mensajeService.recargarMenssajesNoLeidos$.emit(res)
        })
        this.mensajeService.getMensajes().subscribe(res => {
          //Se recargan las conversaciones entrantes
          this.mensajeService.recargarConversaciones$.emit(res)
        })    

       } else if (mensaje[0] == "Comentario" && mensaje[1] == "remitente"  && this.vistaComentario.dentro==true && this.vistaComentario.idEvento==mensaje[2]) {
          this.eventoService.verComentariosEvento(mensaje[2]).subscribe(res => {
            //Se recargan las conversaciones entrantes
           
             let mensajes = res.map(mensaje => {
              return {
                pk: mensaje.pk, cuerpo: mensaje.cuerpo, fecha: this.utilidadesService.formatearDatos(new Date(mensaje.fecha)), remitente: mensaje.remitente
              }
            })
            this.eventoService.mensajesEvento$.emit(mensajes)
          })
        
           
            this.eventoService.recargarUltimoComentarioEvento$.emit()
      
          } else if (mensaje[0] == "Comentario" && mensaje[1] == "remitente" ) {
    
             
              this.eventoService.recargarUltimoComentarioEvento$.emit()
        
    
  
        } else  if (mensaje[0] == "Invitacion" && mensaje[1] == "remitente") {
        
          this.eventoService.verMisInvitaciones().subscribe(res => {

            let invitacionesEventos = res.map(invitacion => {
              return {
                pk: invitacion.pk, evento: invitacion.evento, fecha: this.utilidadesService.formatearDatos(new Date(invitacion.fecha)), destinatario: invitacion.destinatario, foto:'http://localhost:8000'+invitacion.evento.foto
              }
            })
            this.eventoService.recargarInvitacion$.emit(invitacionesEventos)
          })
    
     
        } else  if (mensaje[0] == "Invitacion"  && (mensaje[1] == "aceptada" || mensaje[1] == "rechazada" )) {
        
         
            this.eventoService.recargaEvento$.emit(mensaje[2])

    
     
        }

      
    });








  }
}
}
