import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckTimeSlotDTO } from 'src/app/dtos/checkTimeSlot.dto';
import { ScheduleDTO } from 'src/app/dtos/schedule.dto';
import { Specialty } from 'src/app/model/Specialty';
import { TimeSlot } from 'src/app/model/TimeSlot';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { TimeSlotService } from 'src/app/services/timeSlot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.scss']
})
export class UserScheduleComponent implements OnInit {
  @ViewChild('scheduleForm') scheduleForm!: NgForm;
  userResponse?: UserResponse;
  userId: number = 0;
  userName: string = '';
  userPhone: string = '';
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];
  listDoctors: DoctorResponse[] = [];
  doctorId: number = 0;
  date: Date = new Date();
  timeSlots: TimeSlot[] = [];
  timeSlotId: number = 0;
  showFullScheduleMessage: boolean = false;
  showCheckDateMessage: boolean = false;

  constructor(
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private timeSlotService: TimeSlotService,
    private scheduleService: ScheduleService
  ) {
    this.userId;
    this.userName;
    this.userPhone;
    this.doctorId;
    this.date;
    this.timeSlotId;
  }
  ngOnInit(): void {
    this.getUserResponse();
    this.getSpecialties();
    this.getAllDoctors(0, 100, this.selectedSpecialtyId);
    this.getTimeSlots();
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

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    this.doctorService.getAllDoctors(page, limit, selectedSpecialtyId).subscribe({
      next: (response: any) => {
        this.listDoctors = response.listDoctors;
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error('Error fetching service:', error);
      }
    });
  }

  getTimeSlots() {
    this.timeSlotService.getTimeSlots().subscribe({
      next: (response: any) => {
        debugger
        this.timeSlots = response;
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

  onSpecialtyChange() {
    debugger
    this.getAllDoctors(0, 100, this.selectedSpecialtyId);
  }

  saveSchedule() {
    debugger
    const scheduleDTO: ScheduleDTO = {
      "user_id": this.userId,
      "user_name": this.userName,
      "user_phone": this.userPhone,
      "doctor_id": this.doctorId,
      "date": this.date,
      "time_slot_id": this.timeSlotId
    }
    this.scheduleService.createSchedule(scheduleDTO).subscribe({
      next: (response: any) => {
        debugger
        alert('Tạo lịch khám thanh công')
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert(`error: ${error.error}`)
      }
    })
  }

  checkDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Chuyển `this.date` thành đối tượng `Date`
    const selectedDate = new Date(this.date);

    // So sánh ngày đã chọn với ngày hôm nay
    if (selectedDate < today) {
      this.showCheckDateMessage = true;
    } else {
      this.showCheckDateMessage = false;
    }
  }

  checkTimeSlot(){
    debugger
    const checkTimeSlotDTO: CheckTimeSlotDTO = {
      "doctor_id": this.doctorId,
      "date": this.date
    }
    this.scheduleService.checkTimeSlot(checkTimeSlotDTO).subscribe ({
      next: (response: any) => {
        debugger
        if (response == null) {
          this.showFullScheduleMessage = true; // Hiển thị thông báo
        } else {
          this.timeSlots = response; // Gán danh sách thời gian khám
        }
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert(`error: ${error.error}`)
      }
    })
  }
}
