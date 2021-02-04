import { Component, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { MagoService } from './services/mago.service';
import { MensajeService } from './services/mensaje.service';
import { PeticionService } from './services/peticion.service';
import { TiempoRealService } from './services/tiempo-real.service';
import { WebsocketService } from './services/websocket.service';
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
  constructor(private loginService: LoginService, private peticionService: PeticionService, private magoService: MagoService, private tiempoRealService: TiempoRealService, private mensajeService: MensajeService) {
    this.tiempoRealService.recargarTiempoReal()
  }
}
