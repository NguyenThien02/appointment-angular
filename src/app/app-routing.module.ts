import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { HomeUserComponent } from "./components/user-components/home-user/home-user.component";
import { EditUserComponent } from "./components/user-components/edit-user/edit-user.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'home-user', component:HomeUserComponent},
    {path: 'edit-user', component:EditUserComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}