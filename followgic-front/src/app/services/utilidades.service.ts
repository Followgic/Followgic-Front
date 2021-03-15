import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }


  
  getFechaStr(date) {
    if (!date) date = new Date()
    let mes = date.getMonth() + 1
    let dia = date.getDate()
    return this.parse0(dia) + "/" + this.parse0(mes) + "/" + date.getFullYear()
  }

  getFechaStrBD(date) {
    if (!date) date = new Date()
    let mes = date.getMonth() + 1
    let dia = date.getDate()
    return date.getFullYear() + "-" + this.parse0(mes) + "-" + this.parse0(dia) 
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

  quitarSegundos(hora){
    hora= hora.slice(0,-3)
    return hora

  }

  
  formatearDatos(fecha) {

    let fechaActual = new Date()

    if (fecha.getDate() < fechaActual.getDate()) {
      fecha = this.getFechaStr(fecha)
    } else {
      fecha = this.getHoraStr(fecha)
    }
    return fecha

  }
}
