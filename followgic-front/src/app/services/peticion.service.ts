import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from '../views/login/login.component';
import { LoginService } from './login.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  private URL = "http://localhost:8000"
 

  public messages: any;
  peticiones$ = new EventEmitter()
  peticionesRecibidas$ = new EventEmitter()

  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token ' + localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  noNotificacion: string;


  constructor(private http: HttpClient, private route: Router, private wsService: WebsocketService,
    private loginService: LoginService) {

    this.abrirCanal()
  }

  crearPeticionAmistad(id) {

    return this.http.get<any>(`${this.URL}/peticiones/crearSolicitudAmistad/${id}`, { headers: this.httpHeaders });
  }

  cancelarPeticion(id) {
    return this.http.get<any>(`${this.URL}/peticiones/cancelarSolicitud/${id}/`, { headers: this.httpHeaders });

  }

  peticionesPendientes() {

    return this.http.get<any>(`${this.URL}/peticiones/peticionesPendientes/`);
  }

  peticionesRecibidas() {

    return this.http.get<any>(`${this.URL}/peticiones/misNotificaciones/`, { headers: this.httpHeadersToken });
  }

  aceptarPeticion(id) {

    return this.http.get<any>(`${this.URL}/peticiones/aceptarSolicitud/${id}`, { headers: this.httpHeadersToken });

  }

  rechazarPeticion(id) {

    return this.http.get<any>(`${this.URL}/peticiones/rechazarSolicitud/${id}`, { headers: this.httpHeadersToken });

  }

  peticionPendienteConUsuario(id) {
    return this.http.get<any>(`${this.URL}/peticiones/peticionPendienteConUsuario/${id}`, { headers: this.httpHeadersToken });

  }

  abrirCanal(){
    if (this.loginService.logueado()) {
      this.messages = <Subject<any>>this.wsService.connect('ws://localhost:8000/ws/notificacion/canal_' + this.loginService.getUsername() + '/').pipe(
        map((response: MessageEvent): any => {
          let data = JSON.parse(response.data);
          return data
        })
      );
    }
  }





}

