import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private URL = "http://localhost:8000"
  public messages
  
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });

  mensaje$ = new EventEmitter()
  recargarMensaje$ = new EventEmitter()
  //Varita = true si el usuario esta dentro de la vista
  varita$ =  new EventEmitter()
  constructor(private http: HttpClient, private loginService:LoginService, private wsService: WebsocketService) { 
  }

  getMensajes(){
    return this.http.get<any>(`${this.URL}/mensajes/mensajes/`, { headers: this.httpHeadersToken });
  }

  getMensajesNoLeidos(){
    return this.http.get<any>(`${this.URL}/mensajes/nuevosMensajes/`,{ headers: this.httpHeadersToken });

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
