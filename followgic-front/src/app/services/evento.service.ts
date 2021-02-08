import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private URL = "http://localhost:8000"
  
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }


  getEventos(){
    return this.http.get<any>(`${this.URL}/eventos/listarEventos/`, { headers: this.httpHeadersToken });
  }
  getEventoPorId(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/verEventos/${idEvento}`, { headers: this.httpHeadersToken });
  }

  crearEvento(evento){
    return this.http.post<any>(`${this.URL}/eventos/crearEvento/`, evento,{ headers: this.httpHeadersToken });
  }

  guardarImagen(imagen,idEvento){
    return this.http.post<any>(`${this.URL}/eventos/setImagenverEvento/${idEvento}`, imagen,{ headers: this.httpHeadersToken });
  }

  inscribirseEvento(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/inscribirseEvento/${idEvento}`,{ headers: this.httpHeadersToken });
  }

  desuscribirseEvento(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/desuscribirseEvento/${idEvento}`,{ headers: this.httpHeadersToken });
  }



}
