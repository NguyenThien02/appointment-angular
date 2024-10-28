import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DoctorDTO } from "../dtos/doctor.dto";
import { retry } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiDoctor = `${environment.apiBaseUrl}/doctors`;
  private apiDoctorRegister = `${environment.apiBaseUrl}/doctors/register`;

  constructor(private http: HttpClient) { }

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('specialty_id', selectedSpecialtyId);
    return this.http.get<any[]>(this.apiDoctor, { params });
  }

  deleteDoctorById(id: number){
    const url = `${this.apiDoctor}/${id}`; 
    return this.http.delete<any>(url);
  }

  registerDoctor(doctorDTO: DoctorDTO){
    return this.http.post(this.apiDoctorRegister, doctorDTO);
  }
}