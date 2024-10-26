import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Specialty } from 'src/app/model/Specialty';
import { DoctorResponse } from 'src/app/responses/Doctors/doctor.response';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent implements OnInit {
  listDoctors: DoctorResponse[] = [];
  page: number = 0;
  limit: number = 12;
  totalPages: number = 0;
  pages: number[] = [];
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];

  constructor(
    private doctorService: DoctorService,
    private specialyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.getSpecialies();
    this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
  }

  getSpecialies() {
    this.specialyService.getSpecialies().subscribe({
      next: (response: any) => {
        debugger
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

  searchDoctors() {
    debugger
    this.getAllDoctors(this.page, this.limit,this.selectedSpecialtyId);
  }

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    this.doctorService.getAllDoctors(page, limit, selectedSpecialtyId).subscribe({
      next: (response: any) => {
        debugger
        response.listDoctors.forEach((doctorResponse: DoctorResponse) => {
          doctorResponse.image_url = `${environment.apiBaseUrl}/doctors/images/${doctorResponse.image_url}`;
        });
        this.listDoctors = response.listDoctors;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
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
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
    }
  }
}
