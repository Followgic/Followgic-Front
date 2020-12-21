import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/services/peticion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
peticionesRecibidas:any = [];
noNotificacion:any;
  constructor(private peticionService: PeticionService) {
    this.getPeticionesRecibidas()
   }

  ngOnInit() {
  
  }

  getPeticionesRecibidas(){
    this.noNotificacion = ""
    this.peticionService.peticionesRecibidas().subscribe(res =>{
      this.peticionesRecibidas=res
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

  

}
