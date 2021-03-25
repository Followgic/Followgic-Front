import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { AvisoCancelarInscripcionComponent } from './aviso-cancelar-inscripcion/aviso-cancelar-inscripcion.component';
import { AvisoInscripcionComponent } from './aviso-inscripcion/aviso-inscripcion.component';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
eventos:any=[]
miId:any
modalidades:any=[]
filtrarNombre:any=''
filtrarModalidad:any[]=[]
filtro_valor:any[]=['']
listarMagos:boolean =false
eventosCargados:boolean=false
noEventos:boolean = false
@ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  constructor(public dialog: MatDialog,private modalidadesService: ModalidadesService, private eventoService: EventoService, private magoService:MagoService) {
    this.magoService.getYo(res => {
      this.miId=res
      this.getEventos()
      this.getModalidades()
    })
    this.eventoService.eventosFiltrados$.subscribe(res => {
      this.eventos = res
    })
    
   }

   openDialog(evento) {
    if(evento){
   const dialogRef = this.dialog.open(AvisoInscripcionComponent, {
  
     width: '300px',
     data: { evento: evento },
     autoFocus: false 
   });

   dialogRef.afterClosed().subscribe(result => {
     if(result!='cancelar'){
    this.magoService.getYo(res => {
      this.miId=res
      this.getEventos()
      this.getModalidades()
    })
  }
     console.log(`Dialog result: ${result}`);
   });
 }
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
    this.getEventos()
    this.getModalidades()
  })
}
   console.log(`Dialog result: ${result}`);
 });
}
}


  ngOnInit(){
    this.modalidadesService.modalidadesControl$.subscribe(res =>{
      this.filtrarEventos(null,res)
    
    
      })
  }

  getEventos(){
    this.eventoService.getEventos().subscribe(res=>{
      console.log(res)
      this.eventos = res
      this.eventosCargados=true
      if(this.eventos.length!=0){
        this.noEventos = false
      }else{
        this.noEventos=true
      }
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

  getModalidades() {
    this.modalidadesService.getModalidades().subscribe(res => {
      this.modalidades = res;
      this.modalidadesService.modalidades$.emit(this.modalidades)
    })

  }
  refrescarPagina(event){
    if(event){
      this.magoService.getYo(res => {
        this.miId=res
        this.getEventos()
        this.getModalidades()
      })
      
     }
    
  }

}
