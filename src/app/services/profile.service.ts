import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { ProfileDTO } from "../dtos/profile.dto";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class ProfileService {
    private apiProfile = `${environment.apiBaseUrl}/profiles`;

    constructor(private http: HttpClient) { }

    createProfile(profileDTO: ProfileDTO){
      return this.http.post(`${this.apiProfile}/doctor`, profileDTO);
    }

    getProfileById(profileId: number){
      return this.http.get(`${this.apiProfile}/${profileId}`);
    }

    getProfilesByDoctorId(doctorId: number){
      return this.http.get(`${this.apiProfile}/doctor/${doctorId}`);
    }

    deleteProfileById(profileId: number){
      return this.http.delete(`${this.apiProfile}/${profileId}`);
    }

    UpdateProfile(profileId: number, profileDTO: ProfileDTO){
      return this.http.put(`${this.apiProfile}/doctor/${profileId}`, profileDTO);
    }

    UpdateMoney(profileId: number, profileDTO: ProfileDTO){
      return this.http.put(`${this.apiProfile}/money/${profileId}`, profileDTO);
    }
  }