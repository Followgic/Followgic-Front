import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { CrearEventosComponent } from '../crear-eventos/crear-eventos.component';
import { AvisoCancelarInscripcionComponent } from '../listar-eventos/aviso-cancelar-inscripcion/aviso-cancelar-inscripcion.component';
import { AvisoInscripcionComponent } from '../listar-eventos/aviso-inscripcion/aviso-inscripcion.component';
import { AvisoEliminarEventoComponent } from './aviso-eliminar-evento/aviso-eliminar-evento.component';
import { AvisoHabilitarMensajesComponent } from './aviso-habilitar-mensajes/aviso-habilitar-mensajes.component';
import { AvisoSilenciarMensajesComponent } from './aviso-silenciar-mensajes/aviso-silenciar-mensajes.component';
import { ListaAmigosInvitacionComponent } from './lista-amigos-invitacion/lista-amigos-invitacion.component';
import { ListarAsistentesComponent } from './listar-asistentes/listar-asistentes.component';

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.component.html',
  styleUrls: ['./ver-evento.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerEventoComponent implements OnInit {
  evento: any
  copiaFechaEvento: any
  modalidades: any = []
  magosInscritos: any
  idMia: any
  cargadasModalidades = false
  mostrarHora = true;
  minDate: Date;
  maxDate: Date;
  idEvento: any
  esCreador: boolean = false
  mensajesHabilitados: boolean;
  amigos: any = []


  constructor(private eventoService: EventoService, public dialog: MatDialog, private router: Router,private utilidadesService: UtilidadesService, private modalidadesService: ModalidadesService, private magoService: MagoService) {
    this.magoService.getYo(res => {
      this.idMia = res
      this.cargarPagina()
    })
 
    this.eventoService.recargaEvento$.subscribe(res => {
      this.idEvento=res
      this.magoService.getYo(res => {
        this.idMia = res
        this.getEventoId(this.idEvento)
        this.getMagosInscritosPorEventoId(this.idEvento)
      
      })
    })


    this.eventoService.recargarEventos$.subscribe(res => {
      if (res) {
        this.getMagosInscritosPorEventoId(this.idEvento)
        this.usuariosParaInvitar() 
      }
    })

  }

  cargarPagina() {
    if (this.eventoService.idEvento) {
      this.idEvento = this.eventoService.idEvento
      this.getEventoId(this.eventoService.idEvento)
      this.getMagosInscritosPorEventoId(this.eventoService.idEvento)

    } else if (localStorage.getItem('evento')) {
      this.idEvento = localStorage.getItem('evento')
      this.getEventoId(localStorage.getItem('evento'))
      this.getMagosInscritosPorEventoId(localStorage.getItem('evento'))


    }

  }

  ngOnInit(): void {

  }

  openDialog(idEvento) {
    if (idEvento) {
      const dialogRef = this.dialog.open(CrearEventosComponent, {

        width: '1500px',
        minWidth: '400px',
        data: idEvento,
        autoFocus: false,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != "cancelar") {
          this.cargarPagina()
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  openDialogEliminar(idEvento){
    if (idEvento) {
      const dialogRef = this.dialog.open(AvisoEliminarEventoComponent, {
        data: idEvento,
        autoFocus: false,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != "cancelar") {
          this.router.navigate(["/listar-eventos"])
        }
        console.log(`Dialog result: ${result}`);
      });
    }

  }


  openDialogAsistentes() {

    const dialogRef = this.dialog.open(ListarAsistentesComponent, {

      data: { magosInscritos: this.magosInscritos, idEvento: this.idEvento, esCreador: this.esCreador },
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != "cancelar") {
        this.cargarPagina()
      }

      console.log(`Dialog result: ${result}`);
    });

  }

  openDialogInvitaciones() {

    const dialogRef = this.dialog.open(ListaAmigosInvitacionComponent, {

      data: { amigos: this.amigos, idEvento: this.idEvento, esCreador: this.esCreador },
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result != "cancelar") {
        this.cargarPagina()
      }

      console.log(`Dialog result: ${result}`);
    });

  }

  openDialogInscripcion(evento) {
    if (evento) {
      const dialogRef = this.dialog.open(AvisoInscripcionComponent, {
        height: '200px',
        width: '300px',
        data: { evento: evento },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.cargarPagina()
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  openDialogCancelar(evento) {
    if (evento) {
      const dialogRef = this.dialog.open(AvisoCancelarInscripcionComponent, {
        height: '200px',
        width: '300px',
        data: { evento: evento },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.cargarPagina()
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  openDialogSilenciarMensajes(evento) {
    if (evento) {
      const dialogRef = this.dialog.open(AvisoSilenciarMensajesComponent, {

        minWidth: '300px',
        maxWidth: '350px',
        data: { evento: evento },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.mensajesHabilitados = false
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  openDialogHabilitarMensajes(evento) {
    if (evento) {
      const dialogRef = this.dialog.open(AvisoHabilitarMensajesComponent, {

        minWidth: '300px',
        maxWidth: '350px',
        data: { evento: evento },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.mensajesHabilitados = true
        }
        console.log(`Dialog result: ${result}`);
      });
    }
  }


  getEventoId(idEvento) {
    let fechaEvento
   
    this.eventoService.getEventoPorId(idEvento).subscribe(res => {
      try{
      this.evento = res
      this.copiaFechaEvento = new Date(this.evento.fecha_evento)
      if (this.evento.usuarios_activos.includes(this.idMia)) {
        this.mensajesHabilitados = true
      } else {
        this.mensajesHabilitados = false
      }

      this.getModalidadesNombre(this.evento.modalidades, () => this.transformarEvento())

      if (this.idMia == this.evento.creador) {
        this.usuariosParaInvitar()
      }
    }catch (error) {
      this.router.navigate(["/listar-eventos"])

    }

    })
  

  }

  getMagosInscritosPorEventoId(idEvento) {
    this.eventoService.getMagosInscritosEventoId(idEvento).subscribe(res => {
      this.magosInscritos = res
      this.magosInscritos = this.magosInscritos.map(mago => {
        return {
          pk: mago.pk, foto: "http://localhost:8000"
            + mago.foto, nombre: mago.nombre, nombre_artistico: mago.nombre_artistico, modalidades: mago.modalidades
        }
      })

    })
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.evento.modalidades, event.previousIndex, event.currentIndex);
  }

  cambioDeDia(event) {
    console.log(event)
    if (event.getDate() !== this.copiaFechaEvento.getDate()) {
      this.mostrarHora = false
    } else {
      this.mostrarHora = true
    }

  }

  transformarEvento() {
    this.minDate = new Date(this.evento.fecha_evento);
    this.maxDate = new Date(this.evento.fecha_evento);
    this.evento = {
      aforo: this.evento.aforo, id: this.evento.id, asistentes: this.evento.asistentes, comentarios: this.evento.comentarios, creador: this.evento.creador, descripcion: this.evento.descripcion,
      fecha_creacion: new Date(this.evento.fecha_creacion), fecha_evento: new Date(this.evento.fecha_evento), foto: "http://localhost:8000" + this.evento.foto, hora_evento: this.utilidadesService.quitarSegundos(this.evento.hora_evento),
      link_conferencia: this.evento.link_conferencia, modalidades: this.modalidades, privacidad: this.evento.privacidad, tipo: this.evento.tipo, titulo: this.evento.titulo, token: this.evento.token, usuarios_activos: this.evento.usuarios_activos
    }
    this.cargadasModalidades = true
    if (this.evento.creador == this.idMia) {
      this.esCreador = true
    }


  }

  getModalidadesNombre(modalidadesEventosID, cb) {
    let modalidades

    this.modalidadesService.getModalidades().subscribe(res => {
      modalidades = res.filter(modalidad => modalidadesEventosID.includes(modalidad.pk))

      this.modalidades = modalidades
      if (cb) {
        cb()
      }

    }
    )
  }

  inscribirEnEvento(idEvento) {
    this.eventoService.inscribirseEvento(idEvento).subscribe(res => {
      console.log(res)
      this.cargarPagina()
    })
  }

  desinscribirse(idEvento) {
    this.eventoService.desuscribirseEvento(idEvento).subscribe(res => {
      console.log(res)
      this.cargarPagina()
    })
  }

  usuariosParaInvitar() {
    this.eventoService.usuariosParaInvitar(this.idEvento).subscribe(res => {
      this.amigos = res
      this.amigos = this.amigos.map(amigo => {
        return {
          pk: amigo.pk, foto: "http://localhost:8000"
            + amigo.foto, nombre: amigo.nombre, nombre_artistico: amigo.nombre_artistico
        }
      })
    })
  }





}
