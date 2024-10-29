import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DoctorDTO } from "../dtos/doctor.dto";
import { Observable, retry } from "rxjs";
import { DoctorResponse } from "../responses/Doctors/doctor.response";

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

  saveDoctorResponseToLocalStorage(doctorResponse?: DoctorResponse) {
    try {
      debugger
      if (doctorResponse == null || !doctorResponse) {
        return;
      }
      const doctorResponseJSON = JSON.stringify(doctorResponse);
      localStorage.setItem('doctor', doctorResponseJSON);
      console.log('Doctor response saved to local storage.');
    } catch (error) {
      console.error('Error saving doctor response to local storage:', error);
    }
  }
  getDoctorResponseFromLocalStorage() {
    try {
      const doctorResponseJSON = localStorage.getItem('doctor');
      if (doctorResponseJSON == null || doctorResponseJSON == undefined) {
        return null;
      }
      const doctorResponse = JSON.parse(doctorResponseJSON!);
      console.log('Doctor response retrieved from local storage.');
      return doctorResponse;
    } catch (error) {
      console.error('Error retrieving doctor response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
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