import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  mensajeForm: FormGroup
  disableScrollDown = false
  ventana: boolean = false
  abrirConversacion: boolean = false



  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  constructor(private magoService: MagoService, private mensajeService: MensajeService, private peticionService: PeticionService) {
    this.mensajes = []
    this.mensajeService.varita$.subscribe(res => {
      this.abrirConversacion=res
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

  /* getMago(mensaje){
   this.magoService.getPerfilAmigo(mensaje.remitente).subscribe(res =>{
     this.mago=res
 
    this.mago.foto= 'http://localhost:8000' + this.mago.foto     
    
   
   })
 }  */
  cargarConversacion(idMago, eliminar?) {
    this.mensajeService.getConversacionPorMago(idMago).subscribe(res => {
      this.mensajes = res
      this.abrirConversacion = true

      this.mensajes = res.map(mensaje => {
        return {
          id: mensaje.id, cuerpo: mensaje.cuerpo, estado: mensaje.estado, fecha: this.formatearDatos(new Date(mensaje.fecha)),
          destinatario: mensaje.destinatario, remitente: mensaje.remitente
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
      this.mensajeForm.reset()
    })
  }

  eliminarMensaje(idMensaje, idMago) {
    this.mensajeService.eliminarMensaje(idMensaje).subscribe(res => {

      let eliminar = true
      this.cargarConversacion(idMago, eliminar)
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
    let hora = date.getHours() - 1
    let minutos = date.getMinutes()
    let segundos = date.getSeconds()
    return this.parse0(hora) + ":" + this.parse0(minutos)
  }

  parse0(number) {
    return number < 10 ? '0' + number : number
  }



}
