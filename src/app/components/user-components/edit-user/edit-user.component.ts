import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditUserDTO } from 'src/app/dtos/editUser.dto';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  userResponse?: UserResponse;
  fullName: string = "";
  birthday: Date = new Date();
  address: string = "";

  constructor(private userService: UserService) {
    this.fullName;
    this.birthday;
    this.address;
  }
  ngOnInit(): void {
    this.getUserDetail();
  }
  getUserDetail() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
  saveEditUser() {
    const editUserDTO: EditUserDTO = {
      full_name: this.fullName || this.userResponse?.full_name || "",
      birthday: this.birthday || this.userResponse?.birthday || new Date(),
      address: this.address || this.userResponse?.address || ""
    }
    const id = this.userResponse?.id;
    if (id) {
      debugger;
      this.userService.editUser(editUserDTO, id).subscribe({
        next: (response: any) => {
          debugger;
          const birthday = new Date(response.birthday);
          const formattedBirthday = `${('0' + birthday.getDate()).slice(-2)}-${('0' + (birthday.getMonth() + 1)).slice(-2)}-${birthday.getFullYear()}`;

          this.userResponse = {
            ...response,
            birthday: formattedBirthday,  // Gán ngày sinh đã định dạng lại
          };
          this.userService.saveUserResponseToLocalStorage(this.userResponse);
          this.showUpdateNotification();
        },
        complete: () => {
          debugger;

        },
        error: (error: any) => {
          debugger;
          alert('Cập nhật không thành công: ' + (error.error.message || 'Vui lòng thử lại!'));
        }
      });
    }
  }
  showUpdateNotification() {
    const updates = [];
    if (this.fullName) {
      updates.push(`Họ và tên: ${this.fullName}`);
    }
    if (this.birthday) {
      updates.push(`Ngày sinh: ${this.userResponse?.birthday}`);
    }
    if (this.address) {
      updates.push(`Địa chỉ: ${this.address}`);
    }
    if (updates.length > 0) {
      alert('Thông tin đã cập nhật:\n' + updates.join('\n'));
    } else {
      alert('Không có thông tin nào được cập nhật.');
    }
  }
}
