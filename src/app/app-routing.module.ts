import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { HomeUserComponent } from "./components/user-components/home-user/home-user.component";
import { EditUserComponent } from "./components/user-components/edit-user/edit-user.component";
import { UserPasswordComponent } from './components/user-components/user-password/user-password.component'; 

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user/home-user', component:HomeUserComponent},
    {path: 'user/edit-user', component:EditUserComponent},
    {path: 'update-password', component:UserPasswordComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}