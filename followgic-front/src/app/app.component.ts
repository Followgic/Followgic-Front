import { Component, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { MagoService } from './services/mago.service';
import { MensajeService } from './services/mensaje.service';
import { PeticionService } from './services/peticion.service';
import { NotificacionComponent } from './views/notificacion/notificacion.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'followgic-front';
  notificationPeticion: any[] = [];
  notificationMensajes: any[] = [];
  varita: boolean = false
  @ViewChild('toolbar', { static: false }) toolbar;
  constructor(private loginService: LoginService, private peticionService: PeticionService, private magoService: MagoService, private mensajeService: MensajeService) {
    this.mensajeService.varita$.subscribe(res => {
      this.varita = res
    })

    if (this.loginService.logueado()) {

      this.peticionService.messages.subscribe(msg => {
        let mensaje = msg.message.split(" ")
        if (mensaje[0] == "Petición") {
          this.notificationPeticion = []
          this.notificationPeticion.unshift(msg.message);
          this.toolbar.nuevaPeticiones()
          this.peticionService.peticionesPendientes().subscribe(res => {
            this.peticionService.peticiones$.emit(res)
          })

          this.magoService.getAllAmigos().subscribe(res => {
            this.magoService.recargaAmigos$.emit(res)
          })
          console.log(this.notificationPeticion)
        } else if (mensaje[0] == "Mensaje" && mensaje[1] == "remitente" && this.varita) {
          this.mensajeService.getConversacionPorMago(mensaje[2]).subscribe(res => {
            this.mensajeService.recargarMensaje$.emit(res)
          })


        } else if (mensaje[0] == "Mensaje" && mensaje[1] == "destinatario") {
          this.mensajeService.getConversacionPorMago(mensaje[2]).subscribe(res => {
            this.mensajeService.recargarMensaje$.emit(res)
          })

        }
      });








    }
  }




}
