import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiGetAll = `${environment.apiBaseUrl}/doctors`;
  private apiDeleteById = `${environment.apiBaseUrl}/doctors`;

  constructor(private http: HttpClient) { }

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('specialty_id', selectedSpecialtyId);
    return this.http.get<any[]>(this.apiGetAll, { params });
  }

  deleteDoctorById(id: number){
    const url = `${this.apiDeleteById}/${id}`; 
    return this.http.delete<any>(url);
  }
}