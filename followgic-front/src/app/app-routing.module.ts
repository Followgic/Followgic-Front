import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaComponent } from './components/carta/carta.component';
import { AmigosComponent } from './views/amigos/amigos.component';
import { HomeComponent } from './views/home/home.component';
import { ListarMagosComponent } from './views/listar-magos/listar-magos.component';
import { LoginComponent } from './views/login/login.component';
import { NoAmigoComponent } from './views/paginas-errores/no-amigo/no-amigo.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { RegistroComponent } from './views/registro/registro.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'amigos', component: AmigosComponent},
  {path: 'carta', component: CartaComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'listar-magos', component: ListarMagosComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'perfil/:id', component: PerfilComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'error-amigo', component: NoAmigoComponent}

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
