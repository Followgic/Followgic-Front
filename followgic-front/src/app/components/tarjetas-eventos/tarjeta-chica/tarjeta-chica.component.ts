import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-tarjeta-chica',
  templateUrl: './tarjeta-chica.component.html',
  styleUrls: ['./tarjeta-chica.component.scss']
})
export class TarjetaChicaComponent implements OnInit {
@Input()
evento:any

copiaFechaEvento:any
cargadasModalidades=false
modalidades:any;
magosInscritos:any;
  constructor(private eventoService: EventoService, private router: Router, private modalidadesService: ModalidadesService, private utilidadesService: UtilidadesService) { 

 

  }

  ngOnInit(): void {
    if(this.evento){
      this.transformarEvento()
      this.getMagosInscritosPorEventoId(this.evento.id)

    }
  }

  getMagosInscritosPorEventoId(idEvento){
    this.eventoService.getMagosInscritosEventoId(idEvento).subscribe(res =>{
      this.magosInscritos = res.length
    })
  }


  transformarEvento() {
    this.evento = {
      aforo: this.evento.aforo, id: this.evento.id, asistentes: this.evento.asistentes, comentarios: this.evento.comentarios, creador: this.evento.creador, descripcion: this.evento.descripcion,
      fecha_creacion: new Date(this.evento.fecha_creacion), fecha_evento:  this.utilidadesService.getFechaStr(new Date(this.evento.fecha_evento)), foto: "http://localhost:8000" + this.evento.foto, hora_evento: this.utilidadesService.quitarSegundos(this.evento.hora_evento),
      link_conferencia: this.evento.link_conferencia, modalidades: this.modalidades, privacidad: this.evento.privacidad, tipo: this.evento.tipo, titulo: this.evento.titulo, token: this.evento.token, usuarios_activos: this.evento.usuarios_activos
    }
    if(this.evento.titulo.length> 18){
      this.evento.titulo= this.evento.titulo.substr(0,18) + '...'
      }
   
  }

  verEvento(idEvento){
    this.eventoService.idEvento$.emit(idEvento)
        this.router.navigate(['/ver-evento']);
  }


 

}
