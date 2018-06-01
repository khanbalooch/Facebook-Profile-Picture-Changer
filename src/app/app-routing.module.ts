import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FbLoginComponent } from './components/contentarea/fb-login/fb-login.component';
import { ContentareaComponent } from './components/contentarea/contentarea.component';
import { ShowProfileComponent } from './components/contentarea/show-profile/show-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/fb-login', pathMatch: 'full' },
  { path: 'fb-login', component: FbLoginComponent },
  { path: 'show-profile', component: ShowProfileComponent },
  { path: ':id', component: FbLoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
