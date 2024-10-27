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

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.getUserResponse();
    this.getScheduleByUserId(this.userId);
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }

  getScheduleByUserId(userId: number){
    debugger
    this.scheduleService.getScheduleByUserId(userId).subscribe({
      next: (response: any) =>{
        debugger
        this.schedules = response.map((schedule: ScheduleResponse) => {
          const date = new Date(schedule.date);
          const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
          return {
            ...schedule,
            date: formattedDate  // Add formatted birthday
          };
        });
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
