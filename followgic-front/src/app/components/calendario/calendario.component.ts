import { Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarioComponent implements OnInit {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }

    return '';
  }
  @Input()
  eventos:boolean=true;
  fechaActual=  new Date()
  otraFecha = new Date("2021-03-08")
  listaFecha:any;
  constructor() { 
  this.listaFecha=[this.fechaActual,this.otraFecha]
  

  }

  ngOnInit(): void {
  }

}
