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
    {path: 'admin/doctor-management', component: AdminDoctorManagementComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}