import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/Profile';
import { Service } from 'src/app/model/Service';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-get-detail-profile',
  templateUrl: './doctor-get-detail-profile.component.html',
  styleUrls: ['./doctor-get-detail-profile.component.scss']
})
export class DoctorGetDetailProfileComponent implements OnInit {
  userResponse?: UserResponse;
  userId: number = 0
  profileId: number = 0;
  profile?: Profile;
  services: Service[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private profileDetailService: ProfileDetailService
  ) { }

  ngOnInit(): void {
    this.getUserResponse();
    this.getProfileId();
    this.getProfileById();
    this.getSelectService();
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
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
  getSelectService() {
    this.profileDetailService.getServicesByProfileId(this.profileId).subscribe({
      next: (response: any) => {
        debugger
        this.services = response;
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
}
