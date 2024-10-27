import { Component, OnInit } from '@angular/core';
import { ScheduleResponse } from 'src/app/responses/schedule.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-get-schedule',
  templateUrl: './user-get-schedule.component.html',
  styleUrls: ['./user-get-schedule.component.scss']
})
export class UserGetScheduleComponent implements OnInit{
  userResponse?: UserResponse;
  userId: number = 0;
  schedules: ScheduleResponse[] = []
  scheduleId: number = 0;
  page: number = 0;
  limit: number = 8;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.getUserResponse();
    this.getScheduleByUserId(this.userId, this.page, this.limit);
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }

  getScheduleByUserId(userId: number, page: number, limit: number){
    debugger
    this.scheduleService.getScheduleByUserId(userId, page, limit).subscribe({
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
      this.getScheduleByUserId(this.userId, page, this.limit)
    }
  }

  editSchedule(scheduleId: number){

  }
  deleteSchedule(scheduleId: number){

  }
}
