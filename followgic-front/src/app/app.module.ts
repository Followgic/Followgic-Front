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
    BuscadorEtiquetasComponent

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
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MagoService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
