import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/services/evento.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-toolbar-filtros',
  templateUrl: './toolbar-filtros.component.html',
  styleUrls: ['./toolbar-filtros.component.scss']
})
export class ToolbarFiltrosComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  @Input()
  modalidades: any;
  @Input()
  filtros: boolean = true;

  @Input()
  eventos: any = [];
  @Input()
  copiaEventos: any = [];

  @Input()
  calendario: boolean = true;

  @Input()
  rangoCalendario: boolean = true;

  @Input()
  selectEventos: boolean = true;

  @Input()
  btnLimpiarFiltros: boolean = true;

  @Input()
  titulo: boolean = true;

  @Output()
  modalidadesEmitter = new EventEmitter();

  @Output()
  limpiarFiltro = new EventEmitter();

  tipoEventos: any = [{ nombre: 'Conferencia', valor: 0 }, { nombre: 'Quedada', valor: 1 }]
  tipo: any
  radioButtom: any
  // rango: DateRange<Date>;

  rango = new FormGroup({
    fechaInicio: new FormControl(),
    fechaFin: new FormControl()
  });

  private _mobileQueryListener: () => void;
  @ViewChild('snav', { static: false }) snav;
  @ViewChild('buscadorEtiquetas', { static: false }) buscadorEtiquetas;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public loginService: LoginService, private router: Router, private eventoService: EventoService,
    private utilidadesService: UtilidadesService) {

    this.mobileQuery = media.matchMedia('(max-width: 1820px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


  }

  ngOnInit() {
    if (this.eventos.length != 0) {
      this.copiaEventos = Object.assign([], this.eventos)
    }
 
  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


  ventanaLateral() {
    this.snav.toggle()
  }
  enviarModalidades(modalidadesFiltros) {
    this.modalidadesEmitter.emit(modalidadesFiltros)
  }

  /* onChange(event) {
    console.log(event)
    if (!this.fechaInicio) {
      this.fechaInicio = event
      this.eventos = this.copiaEventos
    } else if (!this.fechaFin && event.getTime() >= this.fechaInicio.getTime()) {
      this.fechaFin = event
  
      let fecha_evento = new Date(this.eventos[0].fecha_evento)
      this.eventos = this.copiaEventos.filter(evento => new Date(evento.fecha_evento).getTime() >= this.fechaInicio.getTime() &&  new Date(evento.fecha_evento).getTime() <= this.fechaFin.getTime())


    } else if (!this.fechaFin && event.getTime() < this.fechaInicio.getTime()) {
      this.fechaInicio = event
      this.eventos = this.copiaEventos
    } else if (this.fechaInicio && this.fechaFin) {
      this.fechaInicio = event
      this.fechaFin = undefined
      this.eventos = this.copiaEventos
    }
    this.eventoService.eventosFiltrados$.emit(this.eventos)
    this.rango = new DateRange(this.fechaInicio, this.fechaFin)


  } */

  filtrarEventos(event?) {
    if (event) this.radioButtom = event

    if (event && !this.rango.value.fechaFin) {

      this.eventos = this.copiaEventos.filter(evento => evento.tipo == event.value)


    } else if (this.rango.value.fechaFin && this.radioButtom) {

      this.eventos = this.copiaEventos.filter(evento =>
        ((new Date(evento.fecha_evento).getTime() >= this.rango.value.fechaInicio.getTime() && new Date(evento.fecha_evento).getTime() <= this.rango.value.fechaFin.getTime())
          || (new Date(evento.fecha_evento) === this.rango.value.fechaInicio)
          || (new Date(evento.fecha_evento) === this.rango.value.fechaFin)) && evento.tipo == this.radioButtom.value)

    } else if (this.rango.value.fechaInicio && this.radioButtom) {

      this.eventos = this.copiaEventos.filter(evento => evento.tipo == this.radioButtom.value)



    } else if (this.rango.value.fechaFin) {

      this.eventos = this.copiaEventos.filter(evento =>
        (new Date(evento.fecha_evento).getTime() >= this.rango.value.fechaInicio.getTime() && new Date(evento.fecha_evento).getTime() <= this.rango.value.fechaFin.getTime())
        || (new Date(evento.fecha_evento) === this.rango.value.fechaInicio)
        || (new Date(evento.fecha_evento) === this.rango.value.fechaFin))


    } else {
      this.eventos = this.copiaEventos

    }
    this.eventoService.eventosFiltrados$.emit(this.eventos)
  }


  limpiarFiltros(){
    this.tipo = null
    this.rango.controls.fechaInicio.setValue("")
    this.rango.controls.fechaFin.setValue("")
    this.buscadorEtiquetas.limpiarBuscador()
    this.eventos = this.copiaEventos
    this.eventoService.eventosFiltrados$.emit(this.eventos)
    this.limpiarFiltro.emit(true)
  }



}

