import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterDTO } from "../dtos/register.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
  
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
    constructor(private http: HttpClient) { }
    register(registerDTO: RegisterDTO):Observable<any>{
        return this.http.post(this.apiRegister, registerDTO);
      }
}