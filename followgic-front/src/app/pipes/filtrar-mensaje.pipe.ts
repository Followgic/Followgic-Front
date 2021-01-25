import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filtrarMensaje'
})
export class FiltrarMensajePipe implements PipeTransform {

  transform(lista: any[], filtro: any[]): any[] {
    let listaFiltrada
    listaFiltrada = Array.from(lista)

    if (!filtro || filtro[0] =="") return lista
    
  

      return lista.filter(user => user.nombre.toUpperCase().includes(filtro[0].toUpperCase()) ||
        user.nombre_artistico.toUpperCase().includes(filtro[0].toUpperCase()));

  }


}