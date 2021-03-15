import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-tarjeta-invitacion',
  templateUrl: './tarjeta-invitacion.component.html',
  styleUrls: ['./tarjeta-invitacion.component.css']
})
export class TarjetaInvitacionComponent implements OnInit {
  @Input()
  invitacion:any;
  @Output()
  recargar = new EventEmitter();
  
  @Input()
  amigo:any;
  
  @Input()
  mago:any 
  
  @Input()
  idEvento:any
  
  @Input()
  esCreador:boolean =false
    
  constructor( private eventoService: EventoService) { }

  ngOnInit(): void {
  }

  aceptarInvitacion(idInvitacion){
    this.eventoService.aceptarInvitacion(idInvitacion).subscribe(res =>{
      console.log(res)
    this.recargar.emit(idInvitacion)
   
    
    })
  }

  rechazarInvitacion(idInvitacion){
    this.eventoService.rechazarInvitacion(idInvitacion).subscribe(res =>{
      console.log(res)
    this.recargar.emit(idInvitacion)
    
    })
  }


}
