import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartaComponent } from './components/carta/carta.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'carta', component: CartaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
