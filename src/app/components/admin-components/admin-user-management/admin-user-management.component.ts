import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {
  userResponse?: UserResponse;
  listUsers: UserResponse[] = [];
  page: number = 0;
  limit: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getAllUser(this.page, this.limit);
  }

  getAllUser(page: number, limit: number) {
    debugger
    this.userService.getAllUser(page, limit).subscribe({
      next: (response: any) => {
        debugger
         this.listUsers = response.listUsers.map((user: UserResponse) => {
          const birthday = new Date(user.birthday);
          const formattedBirthday = `${('0' + birthday.getDate()).slice(-2)}-${('0' + (birthday.getMonth() + 1)).slice(-2)}-${birthday.getFullYear()}`;
          return {
            ...user,
            birthday: formattedBirthday  // Add formatted birthday
          };
        });
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error fetching service:', error);
      }
    })
  }
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllUser(this.page, this.limit);
    }
  }
}
