import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-service',
  templateUrl: './doctor-service.component.html',
  styleUrls: ['./doctor-service.component.scss']
})
export class DoctorServiceComponent {
  userResponse?: UserResponse;
  userId: number = 0;
  doctorResponse?: DoctorResponse;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getUserResponse()
    this.getDoctorResponse();
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }

  getDoctorResponse(){
    this.doctorService.getDoctorByUserId(this.userId).subscribe({
      next: (response: any) => {
        debugger
        response.image_url = `${environment.apiBaseUrl}/doctors/images/${response.image_url}`;
        this.doctorResponse = response;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error:', error);
      }
    })
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
