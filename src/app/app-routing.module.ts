import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FbLoginComponent } from './components/fb-login/fb-login.component';
import { ContentareaComponent } from './shared/contentarea/contentarea.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: ContentareaComponent },
  { path: 'show-profile', component: ShowProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
