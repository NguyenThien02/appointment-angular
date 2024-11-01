import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { Profile } from 'src/app/model/Profile';
import { Service } from 'src/app/model/Service';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { AddServiceService } from 'src/app/services/addService.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-update-profile',
  templateUrl: './doctor-update-profile.component.html',
  styleUrls: ['./doctor-update-profile.component.scss']
})
export class DoctorUpdateProfileComponent implements OnInit{
  userResponse?: UserResponse;
  profileId: number = 0;
  profile?: Profile;
  diagnosis: string = "";
  treatment: string = "";
  medications: string = "";
  services: Service[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private profileDetailService: ProfileDetailService,
    private router: Router,
    private addServiceService: AddServiceService
  ){
  }

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getProfileId();
    this.getProfileById();
    this.getSelectService();
  }

  getProfileId() {
    const profileIdParam = this.route.snapshot.paramMap.get('profileId');
    if (profileIdParam !== null) {
      const profileId = +profileIdParam;  // Chuyển thành số nếu không null
      this.profileId = profileId;
    } else {
      console.warn('Profile ID không tồn tại trong route parameters');
    }
  }
  getProfileById() {
    this.profileService.getProfileById(this.profileId).subscribe({
      next: (response: any) => {
        debugger
        const newDate = new Date(response.schedule.date);
        const formattedDate = `${('0' + newDate.getDate()).slice(-2)}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${newDate.getFullYear()}`;
        this.profile = {
          ...response,
          schedule: {
            ...response.schedule,
            date: formattedDate,
          }
        }
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    });
  }

  saveUpdateProfile(){
    const profileDTO: ProfileDTO = {
      schedule_id: 0,
      diagnosis: this.diagnosis,
      treatment: this.treatment,
      medications: this.medications,
      total_money: 0,
      total_insurance_money: 0
    }
    this.profileService.UpdateProfile(this.profileId, profileDTO).subscribe({
      next: (response: any) => {
          alert("Cập nhật hồ sơ bệnh án thành công");
          this.router.navigate(['/doctor/getProfile/getDetailProfile/', this.profileId]);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
  }

  getSelectService() {
    this.profileDetailService.getServicesByProfileId(this.profileId).subscribe({
      next: (response: any) => {
        debugger
        this.services = response;
        if(this.services){
          response.map((service: Service)=>{
            this.addServiceService.addToCart(this.profileId, service.id);
          })
        }
      },
      complete: () => {
        debugger;
        this.totalAmount = this.services.reduce((sum, service) => sum + service.price, 0);
        this.totalAmountBHYT = this.services.reduce((sum, service) => sum + service.insurancePrice, 0);
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }
  editAddService(){
    this.router.navigate(['/addService', this.profileId]);
  }
}
