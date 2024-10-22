import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  userResponse?: UserResponse;

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    const token = this.tokenService.getToken();
    if (token) {
      this.userService.getUserDetail(token).subscribe({
        next: (response: any) => {
          debugger
          const birthday = new Date(response.birthday);
          const formattedBirthday = `${('0' + birthday.getDate()).slice(-2)}-${('0' + (birthday.getMonth() + 1)).slice(-2)}-${birthday.getFullYear()}`;

          this.userResponse = {
            ...response,
            birthday: formattedBirthday,  // Gán ngày sinh đã định dạng lại
          }; 
          this.userService.saveUserResponseToLocalStorage(this.userResponse);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          debugger;
          alert(error.error.message);
        }
      })
    }
  }
}
