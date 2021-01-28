import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { LoginService } from 'src/app/services/login.service';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
busqueda:any
notifications : any;
  constructor(public loginService: LoginService,public magoService: MagoService, private router: Router, public toolbarComponent: ToolbarComponent, public peticionService: PeticionService) {
    peticionService.messages.subscribe (msg => { 
      this.notifications.unshift(msg.message); 
      console.log(this.notifications)
      });
   }

  ngOnInit(): void {
    this.magoService.setBusqueda('')
  }

  redirigir(redirigir,busqueda){
    if(busqueda){
    this.busqueda=busqueda
    }
    if(redirigir){
    this.magoService.setBusqueda(this.busqueda)
    this.router.navigate(['/listar-magos'])
    this.busqueda=""
    }
  }

}
