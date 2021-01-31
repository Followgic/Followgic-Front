import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('toolbar', { static: false }) toolbar;
  constructor(private loginService: LoginService, private peticionService: PeticionService) {

    if (this.loginService.logueado()) {
      this.peticionService.messages.subscribe(msg => { 
        this.notifications=[]
        this.notifications.unshift(msg.message);
        this.toolbar.nuevaPeticiones()
        this.peticionService.peticionesPendientes().subscribe(res=> {
          this.peticionService.peticiones$.emit(res)
        })
        console.log(this.notifications)
        });







    }
  }
   


    
}
