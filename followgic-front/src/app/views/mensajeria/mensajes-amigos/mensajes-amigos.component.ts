import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

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
  eventos:any=[];
  mensajesEvento:any=[]
  evento:any

  @ViewChild('buscadorNombre', { static: false }) buscadorNombre;
  @ViewChild('buscadorMensaje', { static: false }) buscadorMensaje;
  @ViewChild('buscadorEvento', { static: false }) buscadorEvento;
  eventosSilenciados: any =[]
  
  constructor(private mensajeService: MensajeService, private magoService: MagoService, private eventoService: EventoService, private utilidadesService: UtilidadesService) {
    this.magoService.getYo(res =>{
      this.pk=res
      this.getAmigos(()=>{
        this.getMensajesRecibidos()
      })

      
    })
    this.magoService.recargaAmigos$.subscribe(res=>{
      this.amigos = res
      this.amigos = this.amigos.map(amigo=> {return{ pk: amigo.pk , foto: "http://localhost:8000"
      + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico }})
    })

    this.eventoService.recargarUltimoComentarioEvento$.subscribe(res=>{
      this.eventosSilenciados=[]
      this.listarEventosSubscritos()
    })

    this.mensajeService.recargarConversaciones$.subscribe(res=>{
      this.mensajesRecibidos = []
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
    })

    this.listarEventosSubscritos()
 
    
   }

  ngOnInit(): void {
    
  }

  getMensajesRecibidos() {
    this.mensajeService.getMensajes().subscribe(res => {
      this.mensajesRecibidos = []
    
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

    this.mensajeService.varita$.emit(true)
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

  filtrarEventos(nombre?:String){

    if(nombre|| nombre ==''){

      this.filtro_valor=[nombre]
      }
    
   

  }

  


  restearBusqueda(){
    this.filtrarMensaje("")
    this.filtrarMagos("")
    this.filtrarEventos("")
    this.buscadorNombre.resetarInput();
    this.buscadorMensaje.resetarInput();
    this.buscadorEvento.resetarInput();
  
  }

  //Metodos para comentarios de eventos

  listarEventosSubscritos(){
    this.eventoService.listarEventosSubscritos().subscribe(res => {
      this.eventos= res 
      this.getMisEventos()
    })
  }
  getMisEventos(){
    this.eventoService.getMisEventos().subscribe(res => {
      if(res){
        this.eventos =this.eventos.concat(res)
      }
    })
  }

  verComentariosEvento(){
    this.eventoService.verComentariosEvento(this.evento.id).subscribe(res => {
      console.log(res)
      this.mensajesEvento = res.map(mensaje => {
        return {
          pk: mensaje.pk, cuerpo: mensaje.cuerpo, fecha: this.formatearDatos(new Date(mensaje.fecha)), remitente: mensaje.remitente
        }
      })
     

      this.eventoService.mensajesEvento$.emit(this.mensajesEvento)
      this.eventoService.eventoMensaje$.emit(this.evento)

    })
  }

  
  transformarEvento(evento) {
    this.evento = {
      aforo: evento.aforo, id: evento.id, asistentes: evento.asistentes, comentarios: evento.comentarios, creador: evento.creador, descripcion: evento.descripcion,
      fecha_creacion: new Date(evento.fecha_creacion), fecha_evento:  this.utilidadesService.getFechaStr(new Date(evento.fecha_evento)), foto: "http://localhost:8000" + evento.foto, hora_evento: this.utilidadesService.quitarSegundos(evento.hora_evento),
      link_conferencia: evento.link_conferencia, privacidad: evento.privacidad, tipo: evento.tipo, titulo: evento.titulo, token: evento.token, usuarios_activos: evento.usuarios_activos
    }
    if(this.evento.titulo.length> 35){
      this.evento.titulo= this.evento.titulo.substr(0,35) + '...'
      }
    


    this.verComentariosEvento()
   
  }

  mostrarMensajeEventoSilenciado(event){
    this.eventosSilenciados.push(event)
  }


  formatearDatos(fecha) {

    let fechaActual = new Date()

    if (fecha.getDate() < fechaActual.getDate()) {
      fecha = this.utilidadesService.getFechaStr(fecha)
    } else {
      fecha = this.utilidadesService.getHoraStr(fecha)
    }
    return fecha

  }



  

}
