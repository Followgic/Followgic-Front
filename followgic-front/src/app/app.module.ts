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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartaComponent,
    ToolbarComponent,
    FooterComponent,
    PerfilComponent,
    EfectoBienvenidaComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: MagoService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
