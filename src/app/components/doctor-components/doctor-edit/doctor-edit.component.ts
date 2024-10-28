import { Component, OnInit } from '@angular/core';
import { DoctorDTO } from 'src/app/dtos/doctor.dto';
import { EditUserDTO } from 'src/app/dtos/editUser.dto';
import { environment } from 'src/app/environments/environment';
import { Specialty } from 'src/app/model/Specialty';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit{
  userResponse?: UserResponse;
  userId: number = 0;
  fullName: string = "";
  birthday: Date = new Date();
  address: string = "";
  specialties: Specialty[] = [];
  selectedSpecialtyId: number = 0;
  doctorResponse?: DoctorResponse;
  experience: number = 0;
  doctorId: number = 0;
  selectedFile?: File;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) {
    this.fullName;
   }

  ngOnInit(): void {
    this.getUserResponse();
    this.getSpecialties();
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
  getSpecialties() {
    this.specialtyService.getSpecialies().subscribe({
      next: (response: any) => {
        this.specialties = response;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching service:', error);
      }
    });
  }
  getDoctorResponse(){
    this.doctorService.getDoctorByUserId(this.userId).subscribe({
      next: (response: any) => {
        debugger
        response.image_url = `${environment.apiBaseUrl}/doctors/images/${response.image_url}`;
        this.doctorResponse = response;
        if (this.doctorResponse) {
          this.doctorId = this.doctorResponse.id;
        } else {
          console.error('No doctor response found');
        }
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
  saveInforDoctor(){
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
          this.showUpdateInfor();
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
  showUpdateInfor() {
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

  saveDoctor(){
    const doctorDTO: DoctorDTO = {
      user_id: this.userId,
      specialty_id: this.selectedSpecialtyId,
      experience: this.experience
    } 
    debugger
    this.doctorService.updateDoctor(this.doctorId, doctorDTO).subscribe({
      next: (response: any) =>{
          debugger
          alert('Cập nhật thành công');
      },
      complete: () => {
        debugger;

      },
      error: (error: any) => {
        debugger;
        alert('error:' + error);
      }
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadFile(){
    if (this.selectedFile && this.doctorId) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.doctorService.uploadDoctorImage(this.doctorId, formData).subscribe({
        next: (response: any) => {
          alert('Upload ảnh thành công');
          // this.getDoctorResponse();  // Refresh the doctor data to display updated image URL
        },
        error: (error: any) => {
          alert('Upload ảnh thất bại: ' + error.error.message);
        }
      });
    } else {
      alert("Vui lòng chọn file để upload.");
    }
  }
}
