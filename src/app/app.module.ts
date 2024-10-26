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
import { UserPasswordComponent } from './components/user-components/user-password/user-password.component';
import { AdminHomeComponent } from './components/admin-components/admin-home/admin-home.component';
import { AdminServiceComponent } from './components/admin-components/admin-service/admin-service.component';
import { AdminEditComponent } from './components/admin-components/admin-edit/admin-edit.component';
import { AdminUserManagementComponent } from './components/admin-components/admin-user-management/admin-user-management.component';
import { AdminDoctorManagementComponent } from './components/admin-components/admin-doctor-management/admin-doctor-management.component';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { UserScheduleComponent } from './components/user-components/user-schedule/user-schedule.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeUserComponent,
    EditUserComponent,
    ServicesUserComponent,
    UserPasswordComponent,
    AdminHomeComponent,
    AdminServiceComponent,
    AdminEditComponent,
    AdminUserManagementComponent,
    AdminDoctorManagementComponent,
    ListDoctorComponent,
    UserScheduleComponent,
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
