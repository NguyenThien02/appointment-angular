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
import { UserGetScheduleComponent } from './components/user-components/user-get-schedule/user-get-schedule.component';
import { DoctorHomeComponent } from './components/doctor-components/doctor-home/doctor-home.component';
import { AdminRegisterDoctorComponent } from './components/admin-components/admin-register-doctor/admin-register-doctor.component';
import { DoctorServiceComponent } from './components/doctor-components/doctor-service/doctor-service.component';
import { DoctorEditComponent } from './components/doctor-components/doctor-edit/doctor-edit.component';
import { DoctorScheduleComponent } from './components/doctor-components/doctor-schedule/doctor-schedule.component';
import { DoctorCreateProfileComponent } from './components/doctor-components/doctor-create-profile/doctor-createProfile.component';
import { DoctorAddServiceComponent } from './components/doctor-components/doctor-add-service/doctor-add-service.component';
import { DoctorUpdateProfileComponent } from './components/doctor-components/doctor-update-profile/doctor-update-profile.component';
import { DoctorGetProfileComponent } from './components/doctor-components/doctor-get-profile/doctor-get-profile.component';
import { DoctorGetDetailProfileComponent } from './components/doctor-components/doctor-get-detail-profile/doctor-get-detail-profile.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';

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
    UserGetScheduleComponent,
    DoctorHomeComponent,
    AdminRegisterDoctorComponent,
    DoctorServiceComponent,
    DoctorEditComponent,
    DoctorScheduleComponent,
    DoctorCreateProfileComponent,
    DoctorAddServiceComponent,
    DoctorUpdateProfileComponent,
    DoctorGetProfileComponent,
    DoctorGetDetailProfileComponent,
    DoctorDetailComponent,
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
