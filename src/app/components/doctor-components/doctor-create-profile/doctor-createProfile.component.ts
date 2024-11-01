import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { Service } from 'src/app/model/Service';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-cerateProfile',
  templateUrl: './doctor-create-profile.component.html',
  styleUrls: ['./doctor-create-profile.component.scss']
})
export class DoctorCreateProfileComponent implements OnInit{
  userResponse?: UserResponse;
  userId: number = 0;
  scheduleId: number = 0;
  diagnosis: string = "";
  treatment: string = "";
  medications: string = "";
  profileId: number = 0;
  services: Service[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private profileDetailService: ProfileDetailService,
    private router: Router
  ){}

  ngOnInit() {
    this.getUserResponse();
    this.getScheduleId();
  }
  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }
  getScheduleId(){
    const scheduleIdParam = this.route.snapshot.paramMap.get('scheduleId');
    if (scheduleIdParam !== null) {
        const scheduleId = +scheduleIdParam;  // Chuyển thành số nếu không null
        this.scheduleId = scheduleId;
    } else {
        console.warn('Schedule ID không tồn tại trong route parameters');
    }
  }
  createProfile(){
    const profileDTO: ProfileDTO = {
      schedule_id: this.scheduleId,
      diagnosis: this.diagnosis,
      treatment: this.treatment,
      medications: this.medications,
      total_money: 0,
      total_insurance_money: 0
    }
    debugger
    this.profileService.createProfile( profileDTO).subscribe ({
      next: (response: any) =>{
        this.profileId = response.id;
        if (this.profileId) {
          this.router.navigate(['/addService', this.profileId]);
        } else {
          alert('Vui lòng tạo profile trước khi thêm dịch vụ');
        }
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
  }
  routerAddService() {
    if (this.profileId) {
      this.router.navigate(['/addService', this.profileId]);
    } else {
      alert('Vui lòng tạo profile trước khi thêm dịch vụ');
    }
  }
}
