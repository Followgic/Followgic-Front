import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalidadesService {
  private URL = environment.url

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });
  modalidades$ = new EventEmitter()
  modalidadesControl$ = new EventEmitter()
  constructor(private http: HttpClient) { }

  getModalidades(){
    return this.http.get<any>(`${this.URL}/user/modalidades/`);
  }
  crearModalidad(modalidad){
    return this.http.post<any>(`${this.URL}/user/crearModalidad/`, modalidad, { headers: this.httpHeadersToken });
  }

  
}
