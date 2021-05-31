import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { WebsocketService } from './websocket.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
 /*  private URL = environment.url */
  private URL = environment.url

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private httpHeadersToken = new HttpHeaders({
    'Authorization': 'Token ' + localStorage.getItem('auth_token'),
    'Content-Type': 'application/json'
  });
  idEvento$ = new EventEmitter()
  idEvento: any
  recargarEventos$ = new EventEmitter()
  eventosFiltrados$ = new EventEmitter()
  mensajesEvento$ = new EventEmitter()
  eventoMensaje$ = new EventEmitter()
  eventosCalendario$ = new EventEmitter()
  recargarUltimoComentarioEvento$ = new EventEmitter()

  recargaEvento$ = new EventEmitter()
  //true si el usuario esta dentro de la conversacion 
  //VistaComentario = {idEvento: number, dentro:boolean} // json donde se guarda el id (del evento) de la conversacion que esta abierta y un booleano que indica si esta abierta o no una conversación 
  vistaComentario$ = new EventEmitter()
  //comentariosSinLeer = number
  comentariosSinLeer$ = new EventEmitter()
  //para el tiempo real 
  recargarInvitacion$ = new EventEmitter()
  //para la bolita
  recargarInvitaciones$ = new EventEmitter()


  constructor(private http: HttpClient) {

    this.idEvento$.subscribe(res => {
      localStorage.setItem('evento', res)
      this.idEvento = res

    })

  }


  getEventos() {
    return this.http.get<any>(`${this.URL}/eventos/listarEventos/`, { headers: this.httpHeadersToken });
  }

  getMisEventos() {
    return this.http.get<any>(`${this.URL}/eventos/listarEventosCreadosPorMi/`, { headers: this.httpHeadersToken });
  }
  getEventosPorIdMago(idMago) {
    return this.http.get<any>(`${this.URL}/eventos/eventosPorUsuario/${idMago}/`, { headers: this.httpHeadersToken });
  }
  getEventoPorId(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/verEvento/${idEvento}/`, { headers: this.httpHeadersToken });
  }

  crearEvento(evento) {
    return this.http.post<any>(`${this.URL}/eventos/crearEvento/`, evento, { headers: this.httpHeadersToken });
  }

  editarEvento(idEvento, evento) {
    return this.http.put<any>(`${this.URL}/eventos/editarEvento/${idEvento}/`, evento, { headers: this.httpHeadersToken });
  }

  eliminarEvento(idEvento) {
    return this.http.delete<any>(`${this.URL}/eventos/eliminarEvento/${idEvento}/`, { headers: this.httpHeadersToken });

  }


  guardarImagen(imagen, idEvento) {
    return this.http.post<any>(`${this.URL}/eventos/setImagenverEvento/${idEvento}/`, imagen);
  }

  inscribirseEvento(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/inscribirseEvento/${idEvento}/`, { headers: this.httpHeadersToken });
  }

  desuscribirseEvento(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/cancelarInscripcionEvento/${idEvento}/`, { headers: this.httpHeadersToken });
  }

  getMagosInscritosEventoId(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/verMagosInscritosPorEvento/${idEvento}/`, { headers: this.httpHeadersToken });

  }

  eliminarAsistenteEvento(idEvento, idMago) {
    return this.http.get<any>(`${this.URL}/eventos/eliminarAsistenteEvento/${idEvento}/${idMago}/`, { headers: this.httpHeadersToken });

  }

  habilitarMensajesEvento(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/habilitarMensajesEvento/${idEvento}/`, { headers: this.httpHeadersToken });

  }

  silenciarMensajesEvento(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/silenciarEvento/${idEvento}/`, { headers: this.httpHeadersToken });

  }

  enviarComentario(idEvento, comentario) {
    return this.http.post<any>(`${this.URL}/eventos/enviarComentario/${idEvento}/`, comentario, { headers: this.httpHeadersToken });

  }

  verUltimoComentarioEvento(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/verUltimoComentarioEvento/${idEvento}/`, { headers: this.httpHeadersToken });

  }

  verComentariosEvento(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/verComentariosEvento/${idEvento}/`, { headers: this.httpHeadersToken });

  }

  eliminarComentario(idEvento) {
    return this.http.delete<any>(`${this.URL}/eventos/eliminarComentario/${idEvento}/`, { headers: this.httpHeadersToken });

  }

  verMisInvitaciones() {
    return this.http.get<any>(`${this.URL}/eventos/verMisInvitaciones/`, { headers: this.httpHeadersToken });

  }

  aceptarInvitacion(idInvitacion) {
    return this.http.post<any>(`${this.URL}/eventos/aceptarInvitacion/${idInvitacion}/`, { headers: this.httpHeadersToken });

  }

  rechazarInvitacion(idInvitacion) {
    return this.http.delete<any>(`${this.URL}/eventos/rechazarInvitacion/${idInvitacion}/`, { headers: this.httpHeadersToken });

  }

  generarInvitacion(idEvento, idInvitado) {
    return this.http.get<any>(`${this.URL}/eventos/generarCodigo/${idEvento}|${idInvitado}/`, { headers: this.httpHeadersToken });


  }

  listarEventosSubscritos() {
    return this.http.get<any>(`${this.URL}/eventos/listarEventosSubscritos/`, { headers: this.httpHeadersToken });
  }


  usuariosParaInvitar(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/usuariosParaInvitar/${idEvento}/`, { headers: this.httpHeadersToken });
  }

  comentariosNoLeidos(idEvento) {
    return this.http.get<any>(`${this.URL}/eventos/comentariosNoLeidos/${idEvento}/`, { headers: this.httpHeadersToken });
  }









}
