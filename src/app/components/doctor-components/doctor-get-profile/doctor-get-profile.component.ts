import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/Profile';
import { Schedule } from 'src/app/model/Schedule';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-get-profile',
  templateUrl: './doctor-get-profile.component.html',
  styleUrls: ['./doctor-get-profile.component.scss']
})
export class DoctorGetProfileComponent implements OnInit {
  userResponse?: UserResponse;
  userId: number = 0;
  doctorResponse?: DoctorResponse;
  doctorId: number = 0;
  profiles: Profile[] = [];

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private profileService: ProfileService
  ) {

  }

  ngOnInit() {
    this.getUserResponse();
    this.getDoctorResponse();
    this.getProfilesByDoctorId();
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }
  getDoctorResponse() {
    this.doctorResponse = this.doctorService.getDoctorResponseFromLocalStorage();
    if (this.doctorResponse) {
      debugger
      this.doctorId = this.doctorResponse.id;
    } else {
      console.error('No doctor response found');
    }
  }
  getProfilesByDoctorId() {
    this.profileService.getProfilesByDoctorId(this.doctorId).subscribe({
      next: (response: any) => {
        debugger;
        this.profiles = response.map((profile: Profile) => {
          // Định dạng ngày tháng từ profile.schedule.date
          const date = new Date(profile.schedule.date);
          const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;

          // Trả về đối tượng Profile với ngày đã được định dạng
          return {
            id: profile.id,
            schedule: {
              ...profile.schedule,
              date: formattedDate, // Thêm thuộc tính formattedDate nếu cần
              userName: profile.schedule.userName,
              userPhone: profile.schedule.userPhone,
              timeSlot: profile.schedule.timeSlot,
            },
            diagnosis: profile.diagnosis,
            treatment: profile.treatment,
            medications: profile.medications,
            total_money: profile.total_money,
            total_insurance_money: profile.total_insurance_money,
            created_at: profile.created_at,
          };
        });
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }

}
