import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-tarjeta-chica',
  templateUrl: './tarjeta-chica.component.html',
  styleUrls: ['./tarjeta-chica.component.scss'],
  
})
export class TarjetaChicaComponent implements OnInit {
  @Input()
  evento: any
  @Input()
  mensajeria: boolean = false
  @Output()
  eventoSilenciado = new EventEmitter();

  copiaFechaEvento: any
  cargadasModalidades = false
  modalidades: any;
  magosInscritos: any;
  mensaje: any;
  miId: any;
  invisible:boolean=true;
  noLeidos:any;
  
  constructor(private eventoService: EventoService, private magoService: MagoService, private router: Router, private modalidadesService: ModalidadesService, private utilidadesService: UtilidadesService) {
    if (!this.miId) {
      this.magoService.getYo(res => this.miId = res)
    }
    

  }

  ngOnInit(): void {
    if (this.evento) {
      this.magoService.getYo(res => {

        this.miId = res
        this.transformarEvento(() => {this.verUltimoComentarioEvento(), this.comentariosNoLeidos()})
        this.getMagosInscritosPorEventoId(this.evento.id)
      })


    }
  }

  getMagosInscritosPorEventoId(idEvento) {
    this.eventoService.getMagosInscritosEventoId(idEvento).subscribe(res => {
      this.magosInscritos = res.length
    })
  }


  transformarEvento(cb?) {
    this.evento = {
      aforo: this.evento.aforo, id: this.evento.id, asistentes: this.evento.asistentes, comentarios: this.evento.comentarios, creador: this.evento.creador, descripcion: this.evento.descripcion,
      fecha_creacion: new Date(this.evento.fecha_creacion), fecha_evento: this.utilidadesService.getFechaStr(new Date(this.evento.fecha_evento)), foto: "http://localhost:8000" + this.evento.foto, hora_evento: this.utilidadesService.quitarSegundos(this.evento.hora_evento),
      link_conferencia: this.evento.link_conferencia, modalidades: this.modalidades, privacidad: this.evento.privacidad, tipo: this.evento.tipo, titulo: this.evento.titulo, token: this.evento.token, usuarios_activos: this.evento.usuarios_activos
    }
    if (this.evento.titulo.length > 18) {
      this.evento.titulo = this.evento.titulo.substr(0, 18) + '...'
    }

    if (this.evento.usuarios_activos.includes(this.miId)) {
      cb()
    } else {
      this.eventoSilenciado.emit(this.evento)
    }

  }


  verUltimoComentarioEvento() {
    this.eventoService.verUltimoComentarioEvento(this.evento.id).subscribe(res => {
      if (res) {
        this.mensaje = res

        if (this.mensaje.cuerpo.length > 18) {
          this.mensaje.cuerpo = this.mensaje.cuerpo.substr(0, 18) + '...'

        }
      }
    })

  }

  comentariosNoLeidos(){
    this.eventoService.comentariosNoLeidos(this.evento.id).subscribe(res => {
      if(res.mensajes != 0){
      this.noLeidos = res.mensajes
      this.invisible=false
      }
    })
  }




}
