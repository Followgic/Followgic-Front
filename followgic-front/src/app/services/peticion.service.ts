import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  private URL = "http://localhost:8000"
  peticiones:any;
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient, private route: Router) { }

  crearPeticionAmistad(id) {

    return this.http.get<any>(`${this.URL}/peticiones/crearSolicitudAmistad/${id}`, { headers: this.httpHeaders });
  }

  cancelarPeticion(id){
    return this.http.get<any>(`${this.URL}/peticiones/cancelarSolicitud/${id}/`, { headers: this.httpHeaders });

  }

  peticionesPendientes() {

    return this.http.get<any>(`${this.URL}/peticiones/peticionesPendientes/`);
  }

  peticionesRecibidas() {

    return this.http.get<any>(`${this.URL}/peticiones/misNotificaciones/`,  { headers: this.httpHeadersToken });
  }

  aceptarPeticion(id){

    return this.http.get<any>(`${this.URL}/peticiones/aceptarSolicitud/${id}`,  { headers: this.httpHeadersToken });

  }

  rechazarPeticion(id){

    return this.http.get<any>(`${this.URL}/peticiones/rechazarSolicitud/${id}`,  { headers: this.httpHeadersToken });

  }

  peticionPendienteConUsuario(id){
    return this.http.get<any>(`${this.URL}/peticiones/peticionPendienteConUsuario/${id}`,  { headers: this.httpHeadersToken });

  }
  






}

