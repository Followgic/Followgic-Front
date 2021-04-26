import { Pipe, PipeTransform } from '@angular/core';
import { LocalizacionService } from '../services/localizacion.service';

@Pipe({
  name: 'filtrarEvento'
})
export class FiltrarEventoPipe implements PipeTransform {
  magos:any=[]
  copiaMagos;any=[]
 constructor(private localizacionService: LocalizacionService){}
  transform(lista: any[], filtro: any[]): any[] {
    let listaFiltrada
    listaFiltrada = Array.from(lista)

    if (!filtro) return lista
    
   
    
    if (filtro.length == 1 ) {
      let res = lista.filter(evento => evento.titulo.toUpperCase().includes(filtro[0].toUpperCase()));
    
      if(lista.length !=0){
        var GeoJSON = require('geojson');
        var geoJson = GeoJSON.parse(res.map(evento => evento.localizacion), {Point: ['latitud', 'longitud']});
        this.localizacionService.localizacionEventos$.emit(geoJson)
        } 
       return res
   
    } else {

      lista.forEach(evento => {
        filtro[1].forEach(modalidad => {
          if (!evento.modalidades.includes(modalidad)) {

            var i = listaFiltrada.indexOf(evento)
            if (i !== -1) {
              listaFiltrada.splice(i, 1)
            }

          }
        });
      })

      if (filtro[0]) {
        listaFiltrada = listaFiltrada.filter(evento => evento.titulo.toUpperCase().includes(filtro[0].toUpperCase()));
        var GeoJSON = require('geojson');
        var geoJson = GeoJSON.parse(listaFiltrada.map(evento => evento.localizacion), {Point: ['latitud', 'longitud']});
        this.localizacionService.localizacionEventos$.emit(geoJson)
       return listaFiltrada 
      } else {
        var GeoJSON = require('geojson');
        var geoJson = GeoJSON.parse(listaFiltrada.map(evento => evento.localizacion), {Point: ['latitud', 'longitud']});
        this.localizacionService.localizacionEventos$.emit(geoJson)
        return listaFiltrada
      }


    }
  }



}
