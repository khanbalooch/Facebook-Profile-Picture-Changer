import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FbLoginComponent } from './components/contentarea/fb-login/fb-login.component';

import { FacebookModule } from 'ngx-facebook';
import { ContentareaComponent } from './components/contentarea/contentarea.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShowProfileComponent } from './components/contentarea/show-profile/show-profile.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { TokenService } from './shared/services/token.service';
import { HttpClientModule } from '@angular/common/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FbLoginComponent,
    ContentareaComponent,
    FooterComponent,
    ShowProfileComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
