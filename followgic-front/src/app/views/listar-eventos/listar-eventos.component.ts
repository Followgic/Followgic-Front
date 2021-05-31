import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { environment } from 'src/environments/environment';
import { AvisoCancelarInscripcionComponent } from './aviso-cancelar-inscripcion/aviso-cancelar-inscripcion.component';
import { AvisoInscripcionComponent } from './aviso-inscripcion/aviso-inscripcion.component';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  eventos: any = []
  miId: any
  modalidades: any = []
  filtrarNombre: any = ''
  filtrarModalidad: any[] = []
  filtro_valor: any[] = ['']
  listarMagos: boolean = false
  eventosCargados: boolean = false
  noEventos: boolean = false
  copiaEventos: any = []
  @ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  timerStop: any;
  constructor(public dialog: MatDialog, private modalidadesService: ModalidadesService, public utilidadesService: UtilidadesService, public localizacionService: LocalizacionService, private eventoService: EventoService, private magoService: MagoService) {

    this.magoService.getYo(res => {
      this.miId = res
      this.getEventos()
      this.getModalidades()
    })

    this.eventoService.eventosFiltrados$.subscribe(res => {
      this.eventos = res
    })

/*     this.localizacionService.localizacionFiltrada$.subscribe(res => {


      this.eventos = this.copiaEventos.filter(evento => evento.localizacion.latitud == res[1] && evento.localizacion.longitud == res[0])

    }) */


    this.localizacionService.localizacionFiltrada$.subscribe(res => {
      this.filtrarEventos(null, null, true)
      this.eventos = this.copiaEventos.filter(evento => evento.localizacion.latitud == res[1] && evento.localizacion.longitud == res[0])

    })



  }

  openDialog(evento) {
    if (evento) {
      const dialogRef = this.dialog.open(AvisoInscripcionComponent, {

        width: '300px',
        data: { evento: evento },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.magoService.getYo(res => {
            this.miId = res
            this.getEventos()
            this.getModalidades()
          })
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  openDialogCancelar(evento) {
    if (evento) {
      const dialogRef = this.dialog.open(AvisoCancelarInscripcionComponent, {

        width: '300px',
        data: { evento: evento },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.magoService.getYo(res => {
            this.miId = res
            this.getEventos()
            this.getModalidades()
          })
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }


  ngOnInit() {
    this.modalidadesService.modalidadesControl$.subscribe(res => {
      this.filtrarEventos(null, res)


    })
  }

  getEventos() {
    this.eventoService.getEventos().subscribe(res => {
      console.log(res)
      this.eventos = res
      this.eventosCargados = true
      if (this.eventos.length != 0) {
        this.noEventos = false
      } else {
        this.noEventos = true
      }
      this.eventos.map(evento => {
        return {
          aforo: evento.aforo, id: evento.id, asistentes: evento.asistentes, comentarios: evento.comentarios, creador: evento.creador,
          fecha_creacion: new Date(evento.fecha_creacion), fecha_evento: this.utilidadesService.getFechaStr(new Date(evento.fecha_evento)), foto:evento.foto, hora_evento: evento.hora_evento,
          link_conferencia: evento.link_conferencia, modalidades: evento.modalidades, privacidad: evento.privacidad, tipo: evento.tipo, titulo: evento.titulo, token: evento.token, usuarios_activos: evento.usuarios_activos, localizacion: this.añadirLocalizacion(evento.localizacion),
          descripcion: evento.descripcion
        }
      })

      this.copiaEventos = Object.assign([], this.eventos)
      var GeoJSON = require('geojson');
      var geoJson = GeoJSON.parse(this.eventos.map(evento => evento.localizacion), { Point: ['latitud', 'longitud'] });
      this.localizacionService.localizacionUsuarios$.emit(geoJson)
    })
  }

  añadirLocalizacion(localizacion) {

    localizacion.lat = localizacion.latitud
    localizacion.long = localizacion.longitud
    return localizacion
  }
  acortarDescripcion(descripcion) {
    if (descripcion.length > 223) {
      descripcion = descripcion.substr(0, 223) + '...'
    }
    return descripcion
  }


  abrirFiltros() {
    this.ventanaLateral.ventanaLateral()
  }

  filtrarEventos(nombre?: String, modalidadesControl?: any[], filtro_Valor?) {
    if (modalidadesControl) this.filtrarModalidad = modalidadesControl
    
    if (nombre != null) {
      this.filtrarNombre = nombre

      if (this.timerStop)
        clearTimeout(this.timerStop)

      this.timerStop = setTimeout(() => {

        if (filtro_Valor) {
          this.filtro_valor = null
        } else {
          this.filtro_valor = [this.filtrarNombre, this.filtrarModalidad]
        }
      }, 500)

    } else {


      if (filtro_Valor) {
        this.filtro_valor = null
      } else {
        this.filtro_valor = [this.filtrarNombre, this.filtrarModalidad]
      }
    }

    }

    getModalidades() {
      this.modalidadesService.getModalidades().subscribe(res => {
        this.modalidades = res;
        this.modalidadesService.modalidades$.emit(this.modalidades)
      })

    }
    refrescarPagina(event){
      if (event) {
        this.magoService.getYo(res => {
          this.miId = res
          this.getEventos()
          this.getModalidades()
        })

      }

    }

  }
