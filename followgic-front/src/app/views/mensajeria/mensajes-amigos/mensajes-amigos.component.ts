import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  reset:any;

  @ViewChild('buscadorNombre', { static: false }) buscadorNombre;
  @ViewChild('buscadorMensaje', { static: false }) buscadorMensaje;
  
  constructor(private mensajeService: MensajeService, private magoService: MagoService) {
    this.magoService.getYo(res =>{
      this.pk=res
      this.getAmigos(()=>{
        this.getMensajesRecibidos()
      })
      
    })
 
    
   }

  ngOnInit(): void {
    
  }

  getMensajesRecibidos() {
    this.mensajeService.getMensajes().subscribe(res => {
     
    
      res.forEach(mensaje => {
        let pkAmigo
        if(mensaje.destinatario == this.pk){
          pkAmigo = mensaje.remitente
        }else{
          pkAmigo = mensaje.destinatario
        }

        this.mensajesRecibidos.push( {id: mensaje.id , cuerpo: mensaje.cuerpo, estado: mensaje.estado, fecha: mensaje.fecha,
          destinatario: mensaje.destinatario , remitente: mensaje.remitente, nombre: this.amigos.filter(amigo => amigo.pk==pkAmigo).map(amigo => amigo.nombre)[0],
        nombre_artistico:  this.amigos.filter(amigo => amigo.pk==pkAmigo).map(amigo => amigo.nombre_artistico)[0]})
        })
       
        
        this.filtrarMensaje("")
        
      });
     
}

  getAmigos(cb) {
    this.magoService.getAllAmigos().subscribe(res => {
    
      this.amigos = res
      this.amigos = this.amigos.map(amigo=> {return{ pk: amigo.pk , foto: "http://localhost:8000"
      + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico }})
      if(cb){
        cb()
      }
    })


  }

  cargarConversacion(amigo){
    this.magoService.amigo$.emit(amigo)
    this.mensajeService.varita$.emit(true)
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
    
    if(nombre|| nombre ==''){

    this.filtro_valor=[nombre]
    }
   
  }

  filtrarMensaje(nombre:String){
    if(nombre|| nombre ==''){

      this.filtro_valor=[nombre]
      }

  }

  restearBusqueda(){
    this.filtrarMensaje("")
    this.filtrarMagos("")
    this.buscadorNombre.resetarInput();
    this.buscadorMensaje.resetarInput();
  }

  

}
