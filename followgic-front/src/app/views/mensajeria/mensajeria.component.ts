import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { PeticionService } from 'src/app/services/peticion.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss']
})
export class MensajeriaComponent implements OnInit, AfterViewChecked {
  mensajes: any[] = []
  mago: any = []
  remitenteMensaje: any = []
  mensajeForm: FormGroup
  disableScrollDown = false
  ventana: boolean = false
  abrirConversacion: boolean = false
  abrirConversacionEvento: boolean = false
  evento: any
  miId: any
  recargar: boolean = false

  // 0 => vista principal  , 1=> vista mensajes , 2=> vista comentario
  vista: any = 0





  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  constructor(private magoService: MagoService, private mensajeService: MensajeService, private peticionService: PeticionService, private eventoService: EventoService) {
    this.mensajes = []
    this.magoService.getYo(res => this.miId = res)
    this.mensajeService.cerrarVistaChat$.subscribe(res => {
      if(res) this.vista=0
    })
    this.mensajeService.varita$.subscribe(res => {
      this.abrirConversacion = res
      this.abrirConversacionEvento = res
    })
    this.mensajeForm = new FormGroup({
      cuerpo: new FormControl(""),
      estado: new FormControl(""),
      fecha: new FormControl(""),
      remitente: new FormControl(""),
      destinatario: new FormControl(""),

    });
  

    this.mensajeService.recargarMensaje$.subscribe(res => {
      this.mensajes = res

      this.mensajes = res.map(mensaje => {
        return {
          id: mensaje.id, cuerpo: mensaje.cuerpo, estado: mensaje.estado, fecha: this.formatearDatos(new Date(mensaje.fecha)),
          destinatario: mensaje.destinatario, remitente: mensaje.remitente
        }
      })

      this.disableScrollDown = false



    })




  }

  ngOnInit() {

    this.eventoService.mensajesEvento$.subscribe(res => {
      if (this.evento) {
       
        this.cargarConversacionEvento(res)
      }

    })

    this.eventoService.eventoMensaje$.subscribe(res => {

      this.evento = res
      console.log(this.evento)

    })

    this.magoService.amigo$.subscribe(res => {

      this.cargarConversacion(res.pk)
      this.mago = res
      this.abrirVentana()



    })
    this.scrollToBottom();



  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.disableScrollDown) {
      return
    }
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onScroll() {
    let element = this.myScrollContainer.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false
    } else {
      this.disableScrollDown = true
    }
  }

  abrirVentana() {
    this.ventanaLateral.ventanaLateral()

  }

  resetearEvento(){
    if(this.vista==2){
      this.evento=null
      this.eventoService.vistaComentario$.emit({idEvento:null, dentro:false})
    }
    this.vista = 0
    this.abrirVentana()
  }

  /*    getMago(mensaje){
     this.magoService.getPerfilAmigo(mensaje.remitente).subscribe(res =>{
       
     mensaje.nombre_artistico= res.nombre_artistico
     
     })
   }   */
  cargarConversacion(idMago, eliminar?) {
    this.mensajeService.getConversacionPorMago(idMago).subscribe(res => {
      this.mensajes = res
      this.vista=1
      this.mensajes = res.map(mensaje => {
        return {
          pk: mensaje.id, cuerpo: mensaje.cuerpo, estado: mensaje.estado, fecha: this.formatearDatos(new Date(mensaje.fecha)),
          destinatario: mensaje.destinatario, remitente: mensaje.remitente
        }
      })

      if (!eliminar) {
        this.disableScrollDown = false
      }


    })
  }
  cargarConversacionEvento(mensajes) {
    this.mensajes = mensajes
    /* if (this.abrirConversacionEvento == false) {
      this.abrirVentana()
    }
 */
    if (!this.recargar){
      this.ventanaLateral.cerrarVentana()
    }
     this.vista=2

    this.disableScrollDown = false
  }

  recargarMensajesEventos(eliminar?) {
    this.eventoService.verComentariosEvento(this.evento.id).subscribe(res => {

      this.mensajes = res.map(mensaje => {
        return {
          pk: mensaje.pk, cuerpo: mensaje.cuerpo, fecha: this.formatearDatos(new Date(mensaje.fecha)), remitente: mensaje.remitente
        }
      })

      if (!eliminar) {
        this.disableScrollDown = false
      }
    })
  }

  enviarMensaje(id) {

    this.mensajeService.enviarMensaje(id, this.mensajeForm.value).subscribe(res => {
      this.cargarConversacion(res.destinatario)
      this.ventanaLateral.recargarMensajes()
      this.mensajeForm.reset()
    })
  }

  enviarMensajeEvento(idEvento) {
    if (this.mensajeForm.value.destinatario) {
      delete this.mensajeForm.value.destinatario
    }
    this.eventoService.enviarComentario(idEvento, this.mensajeForm.value).subscribe(res => {
      this.recargarMensajesEventos()
      this.ventanaLateral.recargarMensajesEventos()
      this.mensajeForm.reset()
    })

  }


  eliminarMensaje(idMensaje, idMago) {
    this.mensajeService.eliminarMensaje(idMensaje).subscribe(res => {

      let eliminar = true
      this.cargarConversacion(idMago, eliminar)
    })
  }

  eliminarMensajeEvento(idMensaje) {
    this.eventoService.eliminarComentario(idMensaje).subscribe(res => {
      let eliminar = true
      this.recargarMensajesEventos(eliminar)
    })
  }




  formatearDatos(fecha) {

    let fechaActual = new Date()

    if (fecha.getDate() < fechaActual.getDate()) {
      fecha = this.getFechaStr(fecha)
    } else {
      fecha = this.getHoraStr(fecha)

    }
    return fecha

  }

  getFechaStr(date) {
    if (!date) date = new Date()
    let mes = date.getMonth() + 1
    let dia = date.getDate()
    return this.parse0(dia) + "/" + this.parse0(mes) + "/" + date.getFullYear()
  }

  getHoraStr(date) {
    if (!date) date = new Date()
    let hora = date.getHours() 
    let minutos = date.getMinutes()
    let segundos = date.getSeconds()
    return this.parse0(hora) + ":" + this.parse0(minutos)
  }

  parse0(number) {
    return number < 10 ? '0' + number : number
  }



}
