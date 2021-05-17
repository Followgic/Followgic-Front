import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private URL = "http://localhost:8000"
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }
 
  getPreguntas(){
    return this.http.get<any>(`${this.URL}/preguntas/`, { headers: this.httpHeaders });
  }
}
