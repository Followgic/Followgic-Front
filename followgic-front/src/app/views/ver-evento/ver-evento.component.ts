import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';
import { CrearEventosComponent } from '../crear-eventos/crear-eventos.component';
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
  modalidades: any =[]
  magosInscritos:any
  idMia:any
  cargadasModalidades = false
  mostrarHora = true;
  minDate: Date;
  maxDate: Date;
  idEvento :any
  esCreador:boolean = false


  constructor(private eventoService: EventoService, public dialog: MatDialog, private utilidadesService: UtilidadesService, private modalidadesService: ModalidadesService,  private magoService: MagoService) {

  this.magoService.getYo(res=> this.idMia=res ) 

  this.cargarPagina()
  this.eventoService.recargarEventos$.subscribe(res => {
    if(res){
      this.getMagosInscritosPorEventoId(this.idEvento)
    }
  })

  }

  cargarPagina(){
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
    if(idEvento){
    const dialogRef = this.dialog.open(CrearEventosComponent, {
      height: '610px',
      width: '1600px',
      data:idEvento,
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
     
      console.log(`Dialog result: ${result}`);
    });
  }
  }

  
  openDialogAsistentes() {
    
    const dialogRef = this.dialog.open(ListarAsistentesComponent, {
   
      data:{magosInscritos:this.magosInscritos,idEvento:this.idEvento , esCreador:this.esCreador},
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log(result)
     if(result !="cancelar"){
      this.cargarPagina()
     }
      
      console.log(`Dialog result: ${result}`);
    });
  
  }

  getEventoId(idEvento) {
    let fechaEvento
   
    this.eventoService.getEventoPorId(idEvento).subscribe(res => {
      this.evento = res
      this.copiaFechaEvento = new Date(this.evento.fecha_evento)
      
      this.getModalidadesNombre(this.evento.modalidades, () => this.transformarEvento())


    })

  }

  getMagosInscritosPorEventoId(idEvento){
    this.eventoService.getMagosInscritosEventoId(idEvento).subscribe(res =>{
      this.magosInscritos = res
      this.magosInscritos = this.magosInscritos.map(mago=> {return{ pk: mago.pk , foto: "http://localhost:8000"
      + mago.foto, nombre: mago.nombre, nombre_artistico: mago.nombre_artistico, modalidades: mago.modalidades }})
     
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
    if(this.evento.creador == this.idMia){
      this.esCreador=true
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

  inscribirEnEvento(idEvento){
    this.eventoService.inscribirseEvento(idEvento).subscribe(res=> {
      console.log(res)
      this.cargarPagina()
    })
  }

  desinscribirse(idEvento){
    this.eventoService.desuscribirseEvento(idEvento).subscribe(res => {
      console.log(res)
      this.cargarPagina()
    })
  }


}
