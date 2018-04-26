import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FbLoginComponent } from './components/fb-login/fb-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FbLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
