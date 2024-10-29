import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{
  userResponse?: UserResponse;
  userId: number = 0;
  scheduleId: number = 0;
  diagnosis: string = "";
  treatment: string = "";
  medications: string = "";


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private profileService: ProfileService
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
      debugger
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
      medications: this.medications
    }
    debugger
    this.profileService.createProfile( profileDTO).subscribe ({
      next: (response: any) =>{
        debugger
        alert('Tạo thành công profile')
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
}
