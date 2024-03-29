import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MapboxService {
  private token = "pk.eyJ1IjoiamVzZWxpcm9kIiwiYSI6ImNrbXc5NzJ3ejBiMmozMXBmYjg0cHoyeGMifQ.VvU4iNx2-3NTrFR6PiTvCQ"
  private URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

  constructor(private http: HttpClient) { }

  getCordenadas(direccion) {
    return this.http.get<any>(`${this.URL}${direccion}.json?access_token=${this.token}&language=es`).pipe(map(direccion => direccion));
  }

 
  
}
