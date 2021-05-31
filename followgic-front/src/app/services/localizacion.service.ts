import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {
  private URL = environment.url
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });
  localizacionUsuarios$  = new EventEmitter()
  localizacionEventos$  = new EventEmitter()
  localizacionFiltrada$ = new EventEmitter()

  constructor(private http: HttpClient) { }

  crearLocalizacion(localizacion){
    return this.http.post<any>(`${this.URL}/localizacion/crearLocalizacion/`, localizacion );
  }

  editLocalizacion(localizacion, pk){
    return this.http.post<any>(`${this.URL}/localizacion/editarLocalizacion/${pk}/`, localizacion );
  }

  getLocalizacionesUsuarios(){
    return this.http.get<any>(`${this.URL}/localizacion/obtenerLocalizacionTodosUsuarios/`, { headers: this.httpHeadersToken });
  }

  getLocalizacionUsuarioLogueado(){
    return this.http.get<any>(`${this.URL}/localizacion/obtenerLocalizacion/`, { headers: this.httpHeadersToken });
  }


  

}
