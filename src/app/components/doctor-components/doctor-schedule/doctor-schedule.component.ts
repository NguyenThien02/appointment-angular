import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { ScheduleResponse } from 'src/app/responses/schedule.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit{
  userResponse?: UserResponse;
  doctorResponse?: DoctorResponse;
  userId: number = 0;
  doctorId: number = 0;
  schedules: ScheduleResponse[] = [];
  page: number = 0;
  limit: number = 8;
  totalPages: number = 0;
  pages: number[] = [];
  scheduleId: number = 0;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private scheduleService: ScheduleService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.getUserResponse();
    this.getDoctorResponse()
    this.getScheduleByDoctorId(this.doctorId, this.page, this.limit)
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
    this.doctorResponse = this.doctorService.getDoctorResponseFromLocalStorage();
    if(this.doctorResponse){
      debugger
      this.doctorId = this.doctorResponse.id;
    }else {
      console.error('No doctor response found');
    }
  }
  
  getScheduleByDoctorId(doctorId: number, page: number, limit: number){
    debugger
    this.scheduleService.getScheduleByDoctorId(doctorId, page, limit).subscribe({
      next: (response: any) =>{
        debugger
        this.schedules = response.scheduleResponses.map((schedule: ScheduleResponse) => {
          const date = new Date(schedule.date);
          const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
          return {
            ...schedule,
            date: formattedDate  // Add formatted birthday
          };
        });
        this.totalPages = response.totalPages;
          this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
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
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getScheduleByDoctorId(this.userId, page, this.limit)
    }
  }
  nextProfile(scheduleId: number) {
    debugger
    this.router.navigate(['/doctor/schedule/profile', scheduleId]);
}

}
