import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeUserComponent } from './components/user-components/home-user/home-user.component';
import { EditUserComponent } from './components/user-components/edit-user/edit-user.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ServicesUserComponent } from './components/user-components/user-service/user-service.component'; 


@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AppComponent,
    HomeUserComponent,
    EditUserComponent,
    ServicesUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
