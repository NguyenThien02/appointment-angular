import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.scss']
})
export class AdminServiceComponent {

  userResponse?: UserResponse;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
//Hàm sẽ trả về true nếu đường dẫn hiện tại chứa route đã truyền vào.
  isActive(route: string): boolean {
    return this.router.url.includes(route); // Sử dụng Router để kiểm tra route
  }
  confirmLogout() {
    const confirmed = confirm('Bạn có chắc chắn muốn đăng xuất không?');
    if (confirmed) {
      this.outlog();
    }
  }
  outlog() {
    this.tokenService.removeToken();
    this.router.navigate(['/home']);
  }
}
