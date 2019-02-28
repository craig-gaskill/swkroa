import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {SecurityModule} from './security/security.module';
import {HomeModule} from './feature/home/home.module';

import {ConfigureAuthenticationService} from './core/config/authentication-service.config';
import {ConfigureDictionaryService} from './core/config/dictionary-service.config';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {LoginComponent} from './security/login/login.component';
import {AuthenticationInterceptor} from './security/service/authentication.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    SharedModule,
    SecurityModule,
    HomeModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: 'AuthenticationServiceConfig',
      useClass: ConfigureAuthenticationService
    },
    {
      provide: 'DictionaryServiceConfig',
      useClass: ConfigureDictionaryService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
