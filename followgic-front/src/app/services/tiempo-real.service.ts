import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { MagoService } from './mago.service';
import { MensajeService } from './mensaje.service';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class TiempoRealService {
  notificationPeticion: any[] = [];
  notificationMensajes: any[] = [];
  varita: boolean = false
  constructor(private loginService: LoginService, private peticionService: PeticionService, private magoService: MagoService, private mensajeService: MensajeService) { }


recargarTiempoReal() {

  this.mensajeService.varita$.subscribe(res => {
    this.varita = res
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
      } else if (mensaje[0] == "Mensaje" && mensaje[1] == "remitente" && this.varita) {
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

     
      

      }
    });








  }
}
}
