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
  }