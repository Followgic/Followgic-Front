import { Pipe, PipeTransform } from '@angular/core';
import { LocalizacionService } from '../services/localizacion.service';


@Pipe({
  name: 'filtrarString'
})
export class FiltrarStringPipe implements PipeTransform {
  magos:any=[]
  copiaMagos;any=[]
 constructor(private localizacionService: LocalizacionService){}
  transform(lista: any[], filtro: any[]): any[] {
    let listaFiltrada
    listaFiltrada = Array.from(lista)

    if (!filtro) return lista
    
   
    
    if (filtro.length == 1) {
      let res = lista.filter(user => user.nombre.toUpperCase().includes(filtro[0].toUpperCase()) ||
      user.nombre_artistico.toUpperCase().includes(filtro[0].toUpperCase()));
      
       if(lista.length !=0){
       var GeoJSON = require('geojson');
       var geoJson = GeoJSON.parse(res.map(mago => mago.localizacion), {Point: ['latitud', 'longitud']});
       this.localizacionService.localizacionUsuarios$.emit(geoJson)
       } 
      return res
   
      } else {

      lista.forEach(user => {
        filtro[1].forEach(modalidad => {
          if (!user.modalidades.includes(modalidad)) {

            var i = listaFiltrada.indexOf(user)
            if (i !== -1) {
              listaFiltrada.splice(i, 1)
            }

          }
        });
      })

    

      if (filtro[0]) {
        listaFiltrada = listaFiltrada.filter(user => (user.nombre.toUpperCase().includes(filtro[0].toUpperCase()) || user.nombre_artistico.toUpperCase().includes(filtro[0].toUpperCase())));
         var GeoJSON = require('geojson');
         var geoJson = GeoJSON.parse(listaFiltrada.map(mago => mago.localizacion), {Point: ['latitud', 'longitud']});
         this.localizacionService.localizacionUsuarios$.emit(geoJson)
        return listaFiltrada
      } else {
 
        var GeoJSON = require('geojson');
        var geoJson = GeoJSON.parse(listaFiltrada.map(mago => mago.localizacion), {Point: ['latitud', 'longitud']});
        this.localizacionService.localizacionUsuarios$.emit(geoJson)
        return listaFiltrada
      }


    }
  }


}
