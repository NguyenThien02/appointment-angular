import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from 'src/app/dtos/login.dto';
import { Role } from 'src/app/model/role';
import { LoginResponse } from 'src/app/responses/users/LoginResponse';
import { RoleService } from 'src/app/services/role.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = "";
  password: string = "";
  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    // Gọi API lấy danh sách roles và lưu vào biến roles
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { // Sử dụng kiểu Role[]
        debugger
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    });
  }

  login() {
    debugger
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    // this.tokenService.removeToken();
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
        }
        if(response.role_id === 1){
          this.router.navigate(['/user/home-user']);
        }       
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    });
  }
}
