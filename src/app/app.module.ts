import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FbLoginComponent } from './components/fb-login/fb-login.component';

import { FacebookModule } from 'ngx-facebook';
import { ContentareaComponent } from './shared/contentarea/contentarea.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FbLoginComponent,
    ContentareaComponent,
    FooterComponent
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
