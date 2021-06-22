import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { EventoService } from 'src/app/services/evento.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
 
  selectedDate: any;
  eventos:any=[];
  fechaActual=  new Date()
  otraFecha = new Date("2021-03-08")
  pintado:boolean = false
  copiaEventos:any;
  listaFecha:any = {enero:[],febrero:[],marzo:[],abril:[],mayo:[],junio:[],julio:[],agosto:[],septiembre:[],octubre:[],noviembre:[],diciembre:[]}
  constructor(private eventoService: EventoService,private utilidadesService: UtilidadesService) { 
    this.eventoService.eventosCalendario$.subscribe(res=> {
      this.eventos=res
      this.copiaEventos = Object.assign([] , this.eventos)
      let fecha
      let mes
      let dia 
      let fechas = res.map(evento => evento.fecha_evento)
      fechas.forEach(fecha => {
        fecha =fecha.split("-")
        dia= fecha[2]
     
        if(dia.substr(0,1)=='0'){
          dia = Number(dia.slice(1))
        }else{
          dia = Number(dia)
        }

       

        if(fecha[1]==1){
          mes = 'enero'
        }else if(fecha[1]==2){
          mes = 'febrero'
        }else if(fecha[1]==3){
          mes = 'marzo'
        }else if(fecha[1]==4){
          mes = 'abril'
        }else if(fecha[1]==5){
          mes = 'mayo'
        }else if(fecha[1]==6){
          mes = 'junio'
        }else if(fecha[1]==7){
          mes = 'julio'
        }else if(fecha[1]==8){
          mes = 'agosto'
        }else if(fecha[1]==9){
          mes = 'septiembre'
        }else if(fecha[1]==10){
          mes = 'octubre'
        }else if(fecha[1]==11){
          mes = 'noviembre'
        }else if(fecha[1]==12){
          mes = 'diciembre'
        }
       
        this.listaFecha[mes].push(dia)
        
      });

     
      
      this.pintado = true
      
      
    })



  

  }

  ngOnInit(): void {
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  
    if (view === 'month') {
      const date = cellDate.getDate();
      const month = cellDate.getMonth();

      return ( (month ===0 && this.listaFecha.enero.includes(date)) ||  (month ===1 && this.listaFecha.febrero.includes(date)) 
      ||  (month ===2 && this.listaFecha.marzo.includes(date)) || (month ===3 && this.listaFecha.abril.includes(date)) 
      ||  (month ===4 && this.listaFecha.mayo.includes(date)) ||  (month ===5 && this.listaFecha.junio.includes(date)) 
      ||  (month ===6 && this.listaFecha.julio.includes(date)) ||  (month ===7 && this.listaFecha.agosto.includes(date)) 
      ||  (month ===8 && this.listaFecha.septiembre.includes(date)) ||  (month ===9 && this.listaFecha.octubre.includes(date)) 
      ||  (month ===10 && this.listaFecha.noviembre.includes(date))
      ||  (month ===11 && this.listaFecha.diciembre.includes(date))) ? 'date-class' : '';
    }

    return '';
  
}
onSelect(event){

  this.selectedDate = event;
  this.eventos = this.copiaEventos.filter(evento => evento.fecha_evento==this.utilidadesService.getFechaStrBD(event))
  this.eventoService.eventosFiltrados$.emit(this.eventos)

}



cargarTodos(){
  this.eventos = this.copiaEventos
  this.selectedDate=""
  this.eventoService.recargarEventos$.emit()
}


}


