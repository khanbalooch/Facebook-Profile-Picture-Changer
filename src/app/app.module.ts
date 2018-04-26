import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FbLoginComponent } from './components/fb-login/fb-login.component';

import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent,
    FbLoginComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FacebookModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
