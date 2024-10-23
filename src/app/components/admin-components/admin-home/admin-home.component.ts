import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  userResponse?: UserResponse;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  isActive(route: string): boolean {
    return window.location.pathname.includes(route);
  }
  confirmLogout() {
    const confirmed = confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (confirmed) {
      this.outlog();
    }
  }
  outlog() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}