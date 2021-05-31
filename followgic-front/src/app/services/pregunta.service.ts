import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private URL = environment.url
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
 
  getPreguntas(){
    return this.http.get<any>(`${this.URL}/preguntas/`, { headers: this.httpHeaders });
  }
}
