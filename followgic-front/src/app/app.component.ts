import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { PeticionService } from './services/peticion.service';
import { NotificacionComponent } from './views/notificacion/notificacion.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'followgic-front';
  notifications:any[]=[];

  constructor(private loginService: LoginService, private peticionService: PeticionService) {

    if (this.loginService.logueado()) {
      this.peticionService.messages.subscribe(msg => { 
        this.notifications.unshift(msg.message); 
        console.log(this.notifications)
        });
    }
  }
   


    
}
