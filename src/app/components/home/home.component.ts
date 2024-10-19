import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Service } from 'src/app/model/Service';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  keyword: string = "";
  categories: Category[] = []; 
  selectedCategoryId: number = 0;
  services: Service[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private categoryService: CategoryService,
    private serviceService: ServiceService
  ){}

  ngOnInit(): void {
    this.getCategories();
    this.getServices(this.currentPage, this.itemsPerPage, this.keyword, this.selectedCategoryId);
  }

  getCategories(){
    debugger
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) =>{
        debugger
        this.categories = categories;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  getServices(page: number, limit: number, keyword: string, selectedCategoryId: number){
    debugger
    this.serviceService.getServices(page, limit, keyword, selectedCategoryId).subscribe({
      next: (response: any)=>{
        debugger
        this.services = response.services;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
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

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getServices(this.currentPage, this.itemsPerPage, this.keyword, this.selectedCategoryId);
    }
  }

  searchServices() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    debugger
    this.getServices(this.currentPage, this.itemsPerPage, this.keyword, this.selectedCategoryId);
  }
}
