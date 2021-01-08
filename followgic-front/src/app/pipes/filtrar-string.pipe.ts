import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filtrarString'
})
export class FiltrarStringPipe implements PipeTransform {

  transform(lista: any[], filtro: any[] ): any[] {
    let listaFiltrada
    listaFiltrada=Array.from(lista)
   
    if(!filtro) return lista
    if(filtro.length==1){
    return lista.filter(user => user.nombre.toUpperCase().includes(filtro[0].toUpperCase()) || 
                                user.nombre_artistico.toUpperCase().includes(filtro[0].toUpperCase() ));
    }else{

    lista.forEach(user => {
      filtro[1].forEach(modalidad => {
        if(!user.modalidades.includes(modalidad)){
          
          var i = listaFiltrada.indexOf(user)
          if(i !== -1){
          listaFiltrada.splice(i,1)
          }
        
        }
      });
    })


      return listaFiltrada.filter(user => (user.nombre.toUpperCase().includes(filtro[0].toUpperCase()) || user.nombre_artistico.toUpperCase().includes(filtro[0].toUpperCase())));
                                  
      
  }
  }
  //filtro[1].map(modalidad=> user.modalidades.includes(modalidad))

}
