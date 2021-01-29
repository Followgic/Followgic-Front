import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MagoService } from 'src/app/services/mago.service';
import { PeticionService } from 'src/app/services/peticion.service';

@Component({
  selector: 'app-tarjeta-peticion',
  templateUrl: './tarjeta-peticion.component.html',
  styleUrls: ['./tarjeta-peticion.component.css']
})

export class TarjetaPeticionComponent implements OnInit {
@Input()
peticion:any;
@Output()
recargar = new EventEmitter();

@Input()
amigo:any;

@Input()
mago:any 
  
  constructor(private magoService: MagoService, private peticionService: PeticionService) { 
 
  
 
  }

  ngOnInit() {
    if(!this.mago){
      this.getMago()
      }
  }


  getMago(){
    this.magoService.getPerfilAmigo(this.peticion.remitente).subscribe(res =>{
      this.mago=res

     this.mago.foto= 'http://localhost:8000' + this.mago.foto     
     
    
    })
  }

  aceptarPeticion(id){
    this.peticionService.aceptarPeticion(id).subscribe(res =>{
    this.recargar.emit(id)
   
    
    })
  }

  rechazarPeticion(id){
    this.peticionService.rechazarPeticion(id).subscribe(res =>{
    this.recargar.emit(id)
    
    })
  }

}
