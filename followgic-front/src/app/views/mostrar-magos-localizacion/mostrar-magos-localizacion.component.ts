import { Component, OnInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-mostrar-magos-localizacion',
  templateUrl: './mostrar-magos-localizacion.component.html',
  styleUrls: ['./mostrar-magos-localizacion.component.css']
})
export class MostrarMagosLocalizacionComponent implements OnInit {

  constructor(private mapboxService: MapboxService) { }

  ngOnInit(): void {
    this.getCoordenadasCiudad('São Paulo, São Paulo, Brazil')
  }


  getCoordenadasCiudad(ciudad){
    this.mapboxService.getCordenadas(ciudad).subscribe( res => {
      console.log(res)
    })
  }

}
