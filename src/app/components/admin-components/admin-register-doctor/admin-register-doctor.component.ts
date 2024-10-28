import { Component } from '@angular/core';
import { DoctorDTO } from 'src/app/dtos/doctor.dto';
import { Specialty } from 'src/app/model/Specialty';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-register-doctor',
  templateUrl: './admin-register-doctor.component.html',
  styleUrls: ['./admin-register-doctor.component.scss']
})
export class AdminRegisterDoctorComponent {
  userResponse?: UserResponse;

  userId: number = 0;
  selectedSpecialtyId: number = 0;
  experience: number = 0;

  listUserDoctors: UserResponse[] = [];
  specialties: Specialty[] = [];

  constructor(
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService
  ) {
  }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.userResponseDoctor();
    this.getSpecialties()
  }
  userResponseDoctor() {
    this.userService.getUserResponesDoctor().subscribe({
      next: (response: any) => {
        this.listUserDoctors = response;
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
  registerDoctor(){
    const doctorDTO: DoctorDTO = {
      user_id: this.userId,
      specialty_id: this.selectedSpecialtyId,
      experience: this.experience
    }
    debugger
    this.doctorService.registerDoctor(doctorDTO).subscribe({
      next: (response: any) => {
        debugger
        alert('Đăng ký thành công');
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching service:', error);
      }
    })
  }
}
