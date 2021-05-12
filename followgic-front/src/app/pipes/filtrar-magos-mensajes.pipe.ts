import { Pipe, PipeTransform } from '@angular/core';
import { LocalizacionService } from '../services/localizacion.service';

@Pipe({
  name: 'filtrarMagosMensajes'
})
export class FiltrarMagosMensajesPipe implements PipeTransform {
  magos:any=[]
  copiaMagos;any=[]
 constructor(private localizacionService: LocalizacionService){}
  transform(lista: any[], filtro: any[]): any[] {
    let listaFiltrada
    listaFiltrada = Array.from(lista)

    if (!filtro) return lista
    
   
    
    if (filtro.length == 1 ) {
      let res = lista.filter(mago => mago.nombre.toUpperCase().includes(filtro[0].toUpperCase()));
       return res
   
    } else {

      lista.forEach(mago => {
        filtro[1].forEach(modalidad => {
          if (!mago.modalidades.includes(modalidad)) {

            var i = listaFiltrada.indexOf(mago)
            if (i !== -1) {
              listaFiltrada.splice(i, 1)
            }

          }
        });
      })

      if (filtro[0]) {
        listaFiltrada = listaFiltrada.filter(mago => mago.nombre.toUpperCase().includes(filtro[0].toUpperCase()));
       return listaFiltrada 
      } else {
        return listaFiltrada
      }


    }
  }



}
