import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter,Injectable } from '@angular/core';
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
  idEvento$ = new EventEmitter()
  idEvento:any
  recargarEventos$ = new EventEmitter()
  constructor(private http: HttpClient) { 

    this.idEvento$.subscribe(res => {
      localStorage.setItem('evento', res)
      this.idEvento=res
      
    })

  }


  getEventos(){
    return this.http.get<any>(`${this.URL}/eventos/listarEventos/`, { headers: this.httpHeadersToken });
  }

  getMisEventos(){
    return this.http.get<any>(`${this.URL}/eventos/listarEventosCreadosPorMi/`, { headers: this.httpHeadersToken });
  }
  getEventoPorId(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/verEvento/${idEvento}/`, { headers: this.httpHeadersToken });
  }

  crearEvento(evento){
    return this.http.post<any>(`${this.URL}/eventos/crearEvento/`, evento,{ headers: this.httpHeadersToken });
  }
  
  editarEvento(idEvento,evento){
    return this.http.put<any>(`${this.URL}/eventos/editarEvento/${idEvento}/`, evento,{ headers: this.httpHeadersToken });
  }

  guardarImagen(imagen,idEvento){
    return this.http.post<any>(`${this.URL}/eventos/setImagenverEvento/${idEvento}/`, imagen);
  }

  inscribirseEvento(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/inscribirseEvento/${idEvento}/`,{ headers: this.httpHeadersToken });
  }

  desuscribirseEvento(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/cancelarInscripcionEvento/${idEvento}/`,{ headers: this.httpHeadersToken });
  }

  getMagosInscritosEventoId(idEvento){
    return this.http.get<any>(`${this.URL}/eventos/verMagosInscritosPorEvento/${idEvento}/`,{ headers: this.httpHeadersToken });

  }

  eliminarAsistenteEvento(idEvento,idMago){
    return this.http.get<any>(`${this.URL}/eventos/eliminarAsistenteEvento/${idEvento}/${idMago}/`,{ headers: this.httpHeadersToken });

  }



}
