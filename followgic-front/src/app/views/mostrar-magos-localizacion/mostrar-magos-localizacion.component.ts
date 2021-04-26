import { Component, OnInit } from '@angular/core';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { MapboxService } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-mostrar-magos-localizacion',
  templateUrl: './mostrar-magos-localizacion.component.html',
  styleUrls: ['./mostrar-magos-localizacion.component.css']
})
export class MostrarMagosLocalizacionComponent implements OnInit {
localizaciones : any
  constructor(private mapboxService: MapboxService, private localizacionService: LocalizacionService) {
  
   }

  ngOnInit(): void {
   
  }




}
