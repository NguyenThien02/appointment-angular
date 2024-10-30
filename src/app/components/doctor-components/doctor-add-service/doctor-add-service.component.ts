import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileDetailDTO } from 'src/app/dtos/profileDetail.dto';
import { Category } from 'src/app/model/Category';
import { Service } from 'src/app/model/Service';
import { UserResponse } from 'src/app/responses/users/user.responses';
import { AddServiceService } from 'src/app/services/addService.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-add-service',
  templateUrl: './doctor-add-service.component.html',
  styleUrls: ['./doctor-add-service.component.scss']
})
export class DoctorAddServiceComponent implements OnInit {
  userResponse?: UserResponse;
  profileId: number = 0;
  services: Service[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  keyword: string = "";
  page: number = 0;
  limit: number = 12;
  totalPages: number = 0;
  pages: number[] = [];
  serviceId: number = 0
  selectServiceIds: number[] = [];
  selectServices: Service[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;
  scheduleId: number = 0;
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private addServiceService: AddServiceService,
    private route: ActivatedRoute,
    private profileDetailService: ProfileDetailService,
  ) {

  }
  ngOnInit() {
    this.getUserResponse();
    this.getCategories();
    this.getProfileId();
    this.getSelectService();
    this.getScheduleId()
    // localStorage.removeItem(this.profileId.toString())
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

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getAllServices(this.page, this.limit, this.keyword, this.selectedCategoryId);
  }
  getCategories() {
    debugger
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      complete: () => {
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  getAllServices(page: number, limit: number, keyword: string, selectedCategoryId: number) {
    debugger
    this.serviceService.getServices(page, limit, keyword, selectedCategoryId).subscribe({
      next: (response: any) => {
        this.services = response.services;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      complete: () => {
      },
      error: (error: any) => {
        console.error('Error fetching service:', error);
      }
    });
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllServices(this.page, this.limit, this.keyword, this.selectedCategoryId);
    }
  }

  searchServices() {
    this.getAllServices(this.page, this.limit, this.keyword, this.selectedCategoryId);
  }

  addService(serviceId: number) {
    if (!this.addServiceService.isServiceInCart(this.profileId, serviceId)) {
      const confirmed = confirm('Bạn có chắc chắn muốn chọn dịch vụ này');
      if (confirmed) {
        this.addServiceService.addToCart(this.profileId, serviceId);
        this.getSelectService();
      }
    } else {
      alert('Dịch vụ này đã được chọn')
    }
  }

  getSelectService() {
    debugger
    const addToProfileId = 'profileId:' + this.profileId.toString();
    const storedData = localStorage.getItem(addToProfileId);

    // Kiểm tra và chuyển đổi chuỗi JSON thành mảng number[]
    this.selectServiceIds = storedData ? JSON.parse(storedData) : [];

    this.serviceService.getServicesByIds(this.selectServiceIds).subscribe({
      next: (response: any) => {
        debugger
        this.selectServices = response;
      },
      complete: () => {
        debugger;
        this.totalAmount = this.selectServices.reduce((sum, service) => sum + service.price, 0);
        this.totalAmountBHYT = this.selectServices.reduce((sum, service) => sum + service.insurancePrice, 0);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    })
  }
  deleteSelectService(serviceId: number) {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa dịch vụ này');
    if(confirmed){
      const addToProfileId = 'profileId:' + this.profileId.toString();
      const storedData = localStorage.getItem(addToProfileId);
      let serviceIds: number[] = storedData ? JSON.parse(storedData) : [];
      serviceIds = serviceIds.filter(id => id !== serviceId);
      localStorage.setItem(addToProfileId, JSON.stringify(serviceIds));
      this.getSelectService();
    }
  }


  saveAddService(){
    debugger
    const profileDetailDTO: ProfileDetailDTO = {
      profile_id: this.profileId, 
      service_ids: this.selectServiceIds
    }
    this.profileDetailService.createProfileDetails(profileDetailDTO).subscribe({
      next: (response: any) =>{
        debugger
        alert('Tạo thông tin hồ sơ thành công');
      },
        error: (error) => console.error('Lỗi khi tạo thông tin hồ sơ', error)
    })
  }

  getScheduleId(){
    
  }
}
