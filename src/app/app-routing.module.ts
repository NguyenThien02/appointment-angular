import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { HomeUserComponent } from "./components/user-components/home-user/home-user.component";
import { EditUserComponent } from "./components/user-components/edit-user/edit-user.component";
import { UserPasswordComponent } from './components/user-components/user-password/user-password.component'; 
import { AdminHomeComponent } from "./components/admin-components/admin-home/admin-home.component";
import { AdminEditComponent } from "./components/admin-components/admin-edit/admin-edit.component";
import { AdminUserManagementComponent } from "./components/admin-components/admin-user-management/admin-user-management.component";
import { AdminDoctorManagementComponent } from "./components/admin-components/admin-doctor-management/admin-doctor-management.component";
import { ListDoctorComponent } from "./components/list-doctor/list-doctor.component";
import { UserScheduleComponent } from "./components/user-components/user-schedule/user-schedule.component";
import { UserGetScheduleComponent } from "./components/user-components/user-get-schedule/user-get-schedule.component";
import { DoctorHomeComponent } from "./components/doctor-components/doctor-home/doctor-home.component";
import { AdminRegisterDoctorComponent } from "./components/admin-components/admin-register-doctor/admin-register-doctor.component";
import { DoctorEditComponent } from "./components/doctor-components/doctor-edit/doctor-edit.component";
import { DoctorScheduleComponent } from "./components/doctor-components/doctor-schedule/doctor-schedule.component";
import { DoctorCreateProfileComponent } from "./components/doctor-components/doctor-create-profile/doctor-createProfile.component";
import { DoctorAddServiceComponent } from "./components/doctor-components/doctor-add-service/doctor-add-service.component";
import { DoctorUpdateProfileComponent } from './components/doctor-components/doctor-update-profile/doctor-update-profile.component';
import { DoctorGetProfileComponent } from "./components/doctor-components/doctor-get-profile/doctor-get-profile.component";
import { DoctorGetDetailProfileComponent } from "./components/doctor-components/doctor-get-detail-profile/doctor-get-detail-profile.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user/home', component:HomeUserComponent},
    {path: 'user/edit', component:EditUserComponent},
    {path: 'update-password', component:UserPasswordComponent},
    {path: 'admin/home', component: AdminHomeComponent},
    {path: 'admin/edit', component: AdminEditComponent},
    {path: 'admin/user-management', component: AdminUserManagementComponent},
    {path: 'admin/doctor-management', component: AdminDoctorManagementComponent},
    {path: 'admin/doctor-management/register', component: AdminRegisterDoctorComponent},
    {path: 'list-doctor', component: ListDoctorComponent},
    {path: 'user/schedule', component: UserScheduleComponent},
    {path: 'user/getSchedule', component: UserGetScheduleComponent},
    {path: 'doctor/home', component: DoctorHomeComponent},
    {path: 'doctor/edit', component: DoctorEditComponent},
    {path: 'doctor/schedule', component: DoctorScheduleComponent},
    {path: 'doctor/schedule/createProfile/:scheduleId', component: DoctorCreateProfileComponent},
    {path: 'addService/:profileId', component: DoctorAddServiceComponent},
    {path: 'doctor/updateProfile', component: DoctorUpdateProfileComponent},
    {path: 'doctor/getProfile', component: DoctorGetProfileComponent},
    {path: 'doctor/getProfile/getDetailProfile/:profileId', component: DoctorGetDetailProfileComponent}

    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}