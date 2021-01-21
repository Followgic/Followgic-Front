import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { MagoService } from 'src/app/services/mago.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-mensajes-amigos',
  templateUrl: './mensajes-amigos.component.html',
  styleUrls: ['./mensajes-amigos.component.css']
})
export class MensajesAmigosComponent implements OnInit {
  mensajesRecibidos: any= []
  amigos: any=[]
  filtro_valor:any[]=[""]
  amigo: any;
  pk:any;

  constructor(private mensajeService: MensajeService, private magoService: MagoService) {
    this.magoService.getYo(res =>{
      this.pk=res
      this.getAmigos()
    })
 
    
   }

  ngOnInit(): void {
    this.getMensajesRecibidos()
  }

  getMensajesRecibidos() {
    this.mensajeService.getMensajes().subscribe(res => {
      console.log(res)
      res.forEach(mensaje => {
        this.mensajesRecibidos.push( {id: mensaje.id , cuerpo: mensaje.cuerpo, estado: mensaje.estado, fecha: mensaje.fecha,
          destinatario: mensaje.destinatario , remitente: mensaje.remitente, nombre: this.amigos.filter(amigo => amigo.pk==mensaje.remitente).map(amigo => amigo.nombre)[0],
        nombre_artistico:  this.amigos.filter(amigo => amigo.pk==mensaje.remitente).map(amigo => amigo.nombre_artistico)[0]})
        })
        console.log(this.mensajesRecibidos)
        
      });
     
}

  getAmigos() {
    this.magoService.getAllAmigos().subscribe(res => {
      console.log(res)
      this.amigos = res
      this.amigos = this.amigos.map(amigo=> {return{ pk: amigo.pk , foto: "http://localhost:8000"
      + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico }})
    })
  }

  cargarConversacion(amigo){
    this.magoService.amigo$.emit(amigo)
  }

  getAmigo(mensaje){
    
    let pkAmigo
    if(mensaje.destinatario == this.pk){
      pkAmigo = mensaje.remitente
    }else{
      pkAmigo = mensaje.destinatario
    }

    this.magoService.getPerfilAmigo(pkAmigo).subscribe(res=>{
      let amigo= res
      amigo = { pk: pkAmigo , foto: "http://localhost:8000"
      + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico}
      this.cargarConversacion(amigo)
    })
  }

  filtrarMagos(nombre:String){
    
    if(nombre){

    this.filtro_valor=[nombre]
    }
   
  }

  

}
