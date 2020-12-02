import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaComponent } from './components/carta/carta.component';
import { HomeComponent } from './views/home/home.component';
import { PerfilComponent } from './views/perfil/perfil.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'carta', component: CartaComponent},
  {path: 'perfil', component: PerfilComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
