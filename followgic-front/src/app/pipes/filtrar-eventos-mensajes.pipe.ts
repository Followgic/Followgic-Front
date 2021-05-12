import { Pipe, PipeTransform } from '@angular/core';
import { LocalizacionService } from '../services/localizacion.service';

@Pipe({
  name: 'filtrarEventosMensajes'
})
export class FiltrarEventosMensajesPipe implements PipeTransform {
  magos:any=[]
  copiaMagos;any=[]
 constructor(private localizacionService: LocalizacionService){}
  transform(lista: any[], filtro: any[]): any[] {
    let listaFiltrada
    listaFiltrada = Array.from(lista)

    if (!filtro) return lista
    
   
    
    if (filtro.length == 1 ) {
      let res = lista.filter(evento => evento.titulo.toUpperCase().includes(filtro[0].toUpperCase()));
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
       return listaFiltrada 
      } else {
        return listaFiltrada
      }


    }
  }



}
