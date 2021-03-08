import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CartaComponent } from './components/carta/carta.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EfectoBienvenidaComponent } from './components/efecto-bienvenida/efecto-bienvenida.component';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MagoService } from './services/mago.service';
import { RegistroComponent } from './views/registro/registro.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditarPerfilComponent } from './views/perfil/editar-perfil/editar-perfil.component';
import { ListarMagosComponent } from './views/listar-magos/listar-magos.component';
import { NoAmigoComponent } from './views/paginas-errores/no-amigo/no-amigo.component';
import { AvisoPeticionComponent } from './views/listar-magos/aviso-peticion/aviso-peticion.component';
import { NotificacionComponent } from './views/notificacion/notificacion.component';
import { TarjetaPeticionComponent } from './components/tarjeta-peticion/tarjeta-peticion.component';
import { AmigosComponent } from './views/amigos/amigos.component';
import { ConfirmarEliminacionComponent } from './views/amigos/confirmar-eliminacion/confirmar-eliminacion.component';
import { AvisoCancelarPeticionComponent } from './views/listar-magos/aviso-cancelar-peticion/aviso-cancelar-peticion.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FiltrarStringPipe } from './pipes/filtrar-string.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { EditarModalidadesComponent } from './views/perfil/editar-modalidades/editar-modalidades.component';
import { BuscadorEtiquetasComponent } from './components/buscador-etiquetas/buscador-etiquetas.component';
import { ToolbarFiltrosComponent } from './components/toolbar-filtros/toolbar-filtros.component';
import { FiltrosComponent } from './views/filtros/filtros.component';
import { PreguntasComponent } from './views/registro/preguntas/preguntas.component';
import { AvisoPreguntasComponent } from './views/registro/aviso-preguntas/aviso-preguntas.component';
import { SuspensoComponent } from './views/registro/suspenso/suspenso.component';
import { TarjetaMensajeComponent } from './components/tarjeta-mensaje/tarjeta-mensaje.component';
import { MensajeriaComponent } from './views/mensajeria/mensajeria.component';
import { SidenavMensajeriaComponent } from './components/sidenav-mensajeria/sidenav-mensajeria.component';
import { MensajesAmigosComponent } from './views/mensajeria/mensajes-amigos/mensajes-amigos.component';
import { FiltrarMensajePipe } from './pipes/filtrar-mensaje.pipe';
import { CrearEventosComponent } from './views/crear-eventos/crear-eventos.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { VerEventoComponent } from './views/ver-evento/ver-evento.component';
import { TarjetaChicaComponent } from './components/tarjetas-eventos/tarjeta-chica/tarjeta-chica.component';
import { ListarEventosComponent } from './views/listar-eventos/listar-eventos.component';
import { TarjetaGrandeComponent } from './components/tarjetas-eventos/tarjeta-grande/tarjeta-grande.component';
import { FiltrarEventoPipe } from './pipes/filtrar-evento.pipe';
import { ListarAsistentesComponent } from './views/ver-evento/listar-asistentes/listar-asistentes.component';
import { AvisoEliminarAsistenteComponent } from './views/ver-evento/listar-asistentes/aviso-eliminar-asistente/aviso-eliminar-asistente.component';
import { AvisoInscripcionComponent } from './views/listar-eventos/aviso-inscripcion/aviso-inscripcion.component';
import { AvisoCancelarInscripcionComponent } from './views/listar-eventos/aviso-cancelar-inscripcion/aviso-cancelar-inscripcion.component';
import { AvisoSilenciarMensajesComponent } from './views/ver-evento/aviso-silenciar-mensajes/aviso-silenciar-mensajes.component';
import { AvisoHabilitarMensajesComponent } from './views/ver-evento/aviso-habilitar-mensajes/aviso-habilitar-mensajes.component';
import { TarjetaInvitacionComponent } from './components/tarjetas-eventos/tarjeta-invitacion/tarjeta-invitacion.component';
import { ListaAmigosInvitacionComponent } from './views/ver-evento/lista-amigos-invitacion/lista-amigos-invitacion.component';
import { ListaEventosInscritosComponent } from './views/lista-eventos-inscritos/lista-eventos-inscritos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartaComponent,
    ToolbarComponent,
    FooterComponent,
    PerfilComponent,
    EfectoBienvenidaComponent,
    LoginComponent,
    RegistroComponent,
    EditarPerfilComponent,
    ListarMagosComponent,
    NoAmigoComponent,
    AvisoPeticionComponent,
    NotificacionComponent,
    TarjetaPeticionComponent,
    AmigosComponent,
    ConfirmarEliminacionComponent,
    AvisoCancelarPeticionComponent,
    BuscadorComponent,
    FiltrarStringPipe,
    LoaderComponent,
    EditarModalidadesComponent,
    BuscadorEtiquetasComponent,
    ToolbarFiltrosComponent,
    FiltrosComponent,
    PreguntasComponent,
    AvisoPreguntasComponent,
    SuspensoComponent,
    TarjetaMensajeComponent,
    MensajeriaComponent,
    SidenavMensajeriaComponent,
    MensajesAmigosComponent,
    FiltrarMensajePipe,
    CrearEventosComponent,
    VerEventoComponent,
    TarjetaChicaComponent,
    ListarEventosComponent,
    TarjetaGrandeComponent,
    FiltrarEventoPipe,
    ListarAsistentesComponent,
    AvisoEliminarAsistenteComponent,
    AvisoInscripcionComponent,
    AvisoCancelarInscripcionComponent,
    AvisoSilenciarMensajesComponent,
    AvisoHabilitarMensajesComponent,
    TarjetaInvitacionComponent,
    ListaAmigosInvitacionComponent,
    ListaEventosInscritosComponent,
    CalendarioComponent,
  
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MagoService, multi: true },{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color:  'primary'},
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
