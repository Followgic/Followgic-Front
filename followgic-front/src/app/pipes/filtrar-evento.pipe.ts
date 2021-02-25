import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarEvento'
})
export class FiltrarEventoPipe implements PipeTransform {

  transform(lista: any[], filtro: any[]): any[] {
    let listaFiltrada
    listaFiltrada = Array.from(lista)

    if (!filtro) return lista
    
   
    
    if (filtro.length == 1 || filtro[1].length==0) {
      
      return lista.filter(evento => evento.titulo.toUpperCase().includes(filtro[0].toUpperCase()));
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
        return listaFiltrada.filter(evento => evento.titulo.toUpperCase().includes(filtro[0].toUpperCase()));
      } else {
        return listaFiltrada
      }


    }
  }



}
