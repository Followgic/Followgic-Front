import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaComponent } from './components/carta/carta.component';
import { TarjetaChicaComponent } from './components/tarjetas-eventos/tarjeta-chica/tarjeta-chica.component';
import { AmigosComponent } from './views/amigos/amigos.component';
import { CrearEventosComponent } from './views/crear-eventos/crear-eventos.component';
import { FiltrosComponent } from './views/filtros/filtros.component';
import { HomeComponent } from './views/home/home.component';
import { ListaEventosInscritosComponent } from './views/lista-eventos-inscritos/lista-eventos-inscritos.component';
import { ListarEventosComponent } from './views/listar-eventos/listar-eventos.component';
import { ListarMagosComponent } from './views/listar-magos/listar-magos.component';
import { LoginComponent } from './views/login/login.component';
import { MensajeriaComponent } from './views/mensajeria/mensajeria.component';
import { NoAmigoComponent } from './views/paginas-errores/no-amigo/no-amigo.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { PreguntasComponent } from './views/registro/preguntas/preguntas.component';
import { RegistroComponent } from './views/registro/registro.component';
import { VerEventoComponent } from './views/ver-evento/ver-evento.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'amigos', component: AmigosComponent},
  {path: 'carta', component: CartaComponent},
  {path: 'crear-eventos', component: CrearEventosComponent},
  {path: 'error-amigo', component: NoAmigoComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lista-eventos-inscritos', component: ListaEventosInscritosComponent},
  {path: 'listar-eventos', component: ListarEventosComponent},
  {path: 'listar-magos', component: ListarMagosComponent},
  {path: 'mensajeria', component: MensajeriaComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'perfil/:id', component: PerfilComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'preguntas', component: PreguntasComponent},
  {path: 'ver-evento', component:  VerEventoComponent},
 
  

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
