import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private URL = environment.url
  public messages
  
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });

  cerrarVistaChat$ = new EventEmitter()
  mensaje$ = new EventEmitter()
  recargarMensaje$ = new EventEmitter()
  recargarConversaciones$ = new EventEmitter()
  recargarMenssajesNoLeidos$= new EventEmitter()
  mensajesNoLeidosPorMago$ = new EventEmitter()
  //Varita = {idUsuario: number, dentro:boolean} // json donde se guarda el id de la conversacion que esta abierta y un booleano que indica si esta abierta o no una conversación 
  varita$ =  new EventEmitter()
  constructor(private http: HttpClient, private loginService:LoginService, private wsService: WebsocketService) { 
  }
//Ver ultimos mensajes con cada amigo , refresca todas las conversaciones que tiene abiertas un usuario
  getMensajes(){
    return this.http.get<any>(`${this.URL}/mensajes/mensajes/`, { headers: this.httpHeadersToken });
  }
//Las bolitas de las notificaciones de mensajes
  getMensajesNoLeidos(){
    return this.http.get<any>(`${this.URL}/mensajes/nuevosMensajes/`,{ headers: this.httpHeadersToken });

  }
//
  getMensajesNoLeidosPorMago(idMago){
    return this.http.get<any>(`${this.URL}/mensajes/mensajesSinLeerPorMago/${idMago}/`,{ headers: this.httpHeadersToken });

  }

  
  getConversacion(id){
    return this.http.get<any>(`${this.URL}/mensajes/verConversacion/${id}/`, { headers: this.httpHeadersToken });

  }
  getConversacionPorMago(id){
    return this.http.get<any>(`${this.URL}/mensajes/verConversacionPorMago/${id}/`, { headers: this.httpHeadersToken });

  }

   
  eliminarMensaje(id){
    return this.http.delete<any>(`${this.URL}/mensajes/eliminarMensaje/${id}/`, { headers: this.httpHeadersToken });

  }

  enviarMensaje(id, mensaje){
    return this.http.post<any>(`${this.URL}/mensajes/enviarMensaje/${id}/`, mensaje,{ headers: this.httpHeadersToken });

  }
}
