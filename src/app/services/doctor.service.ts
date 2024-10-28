import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DoctorDTO } from "../dtos/doctor.dto";
import { Observable, retry } from "rxjs";

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

  getDoctorByUserId(userId: number){
    const url = `${this.apiDoctor}/${userId}`; 
    return this.http.get(url)
  }

  updateDoctor(doctorId: number, doctorDTO: DoctorDTO){
    const url = `${this.apiDoctor}/${doctorId}`; 
    return this.http.put(url,doctorDTO)
  }

  uploadDoctorImage(doctorId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiDoctor}/upload/${doctorId}`, formData);
  }
  
}