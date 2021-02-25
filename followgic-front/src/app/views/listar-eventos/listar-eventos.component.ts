import { Component, OnInit, ViewChild } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { MagoService } from 'src/app/services/mago.service';
import { ModalidadesService } from 'src/app/services/modalidades.service';

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
@ViewChild('ventanaLateral', { static: false }) ventanaLateral;
  constructor(private modalidadesService: ModalidadesService, private eventoService: EventoService, private magoService:MagoService) {
    this.magoService.getYo(res => {
      this.miId=res
      this.getEventos()
      this.getModalidades()
    })
    
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
