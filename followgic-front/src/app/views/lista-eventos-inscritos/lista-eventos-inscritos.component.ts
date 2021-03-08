import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { AvisoCancelarInscripcionComponent } from '../listar-eventos/aviso-cancelar-inscripcion/aviso-cancelar-inscripcion.component';

@Component({
  selector: 'app-lista-eventos-inscritos',
  templateUrl: './lista-eventos-inscritos.component.html',
  styleUrls: ['./lista-eventos-inscritos.component.css']
})
export class ListaEventosInscritosComponent implements OnInit {
  eventos:any=[]
  miId:any
  filtrarNombre:any=''
filtrarModalidad:any[]=[]
filtro_valor:any[]=['']
  @ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  constructor( public dialog: MatDialog, private eventoService: EventoService, private magoService:MagoService) { 
    this.magoService.getYo(res => {
      this.miId=res
      this.getEventosInscripcion()
    })
    
   }

  

  ngOnInit(): void {
  }
  openDialogCancelar(evento) {
    if(evento){
   const dialogRef = this.dialog.open(AvisoCancelarInscripcionComponent, {
   
     width: '300px',
     data: { evento: evento },
     autoFocus: false 
   });
  
   dialogRef.afterClosed().subscribe(result => {
     if(result!='cancelar'){
    this.magoService.getYo(res => {
      this.miId=res
      this.getEventosInscripcion()
  
    })
  }
     console.log(`Dialog result: ${result}`);
   });
  }
  }

  
  getEventosInscripcion(){
    this.eventoService.listarEventosSubscritos().subscribe(res=>{
      console.log(res)
      this.eventos = res
    })
  }

  abrirFiltros(){
    this.ventanaLateral.ventanaLateral()
  }

  filtrarEventos(nombre?:String, modalidadesControl?:any[]){

    if(nombre!=null)this.filtrarNombre = nombre

    if(modalidadesControl) this.filtrarModalidad = modalidadesControl

    

    this.filtro_valor=[this.filtrarNombre,this.filtrarModalidad]
   

  }


  

}
