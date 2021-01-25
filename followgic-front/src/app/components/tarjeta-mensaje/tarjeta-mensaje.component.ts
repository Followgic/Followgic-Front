import { Component, Input, OnInit } from '@angular/core';
import { MagoService } from 'src/app/services/mago.service';

@Component({
  selector: 'app-tarjeta-mensaje',
  templateUrl: './tarjeta-mensaje.component.html',
  styleUrls: ['./tarjeta-mensaje.component.css']
})
export class TarjetaMensajeComponent implements OnInit {
  mago:any = []
  @Input()
  mensaje:any;
  cuerpo:any;
  pk:any;
  identificador:any
  nombre:any
  
  constructor(private magoService: MagoService) { 
    
  }

  ngOnInit(): void {
    if(this.mensaje){
      this.magoService.getYo(res => {
        this.pk=res
        this.getMago()
    this.formatearDatos()

      })
  

    }
  }
  


  getMago(){
  
   
    let pkAmigo
    if(this.mensaje.destinatario == this.pk){
      pkAmigo = this.mensaje.remitente
      this.identificador = false
      
    }else{
      pkAmigo = this.mensaje.destinatario
      this.identificador = true
    }

    this.magoService.getPerfilAmigo(pkAmigo).subscribe(res =>{
      this.mago=res

     this.mago.foto= 'http://localhost:8000' + this.mago.foto 
     this.nombre = this.mago.nombre.split(" ")[0]     
     
    
    })
  }

  formatearDatos(){
    if(this.mensaje.cuerpo.length> 28){
    this.mensaje.cuerpo= this.mensaje.cuerpo.substr(0,20) + '...'
    }
    if( this.mensaje.fecha.includes('-') ){
    let fechaActual = new Date()
    let fecha = new Date(this.mensaje.fecha)
    
    if(fecha.getDate() < fechaActual.getDate()){
      this.mensaje.fecha = this.getFechaStr(fecha)
    }else{
      this.mensaje.fecha = this.getHoraStr(fecha)
    }
  }

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

  parse0(number){
    return number < 10 ? '0' + number : number
  }


 


}
