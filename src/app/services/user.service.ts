import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegisterDTO } from "../dtos/register.dto";
import { Observable } from "rxjs";
import { LoginDTO } from "../dtos/login.dto";
import { UserResponse } from "../responses/users/user.responses";
import { EditUserDTO } from "../dtos/editUser.dto";
import { PassWordDTO } from "../dtos/passWord.dto";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiEdit = `${environment.apiBaseUrl}/users`;
  private apiUpdatePassword = `${environment.apiBaseUrl}/users/updatePasword`;
  private apiGetAll = `${environment.apiBaseUrl}/users`;
  private apiGetUserDoctor = `${environment.apiBaseUrl}/users/user-doctor`;

  constructor(private http: HttpClient) { }
  
  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO);
  }
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO);
  }
  getUserDetail(token: string) {
    return this.http.get(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if (userResponse == null || !userResponse) {
        return;
      }
      //chuyển đổi đối tượng userResponse thành một chuỗi JSON
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage() {
    try {
      const userResponseJSON = localStorage.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // chuyển đổi một chuỗi JSON (JSON string) thành một đối tượng JavaScript
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  editUser(editUserDTO: EditUserDTO, id: number): Observable<any> {
    // const url = `${this.apiEdit}/${id}`;
    debugger;
    return this.http.put(`${this.apiEdit}/${id}`, editUserDTO);
  }
  updatePassword(passWordDTO: PassWordDTO, id: number): Observable<any> {
    debugger;
    return this.http.put(`${this.apiUpdatePassword}/${id}`, passWordDTO);
  }
  getAllUser(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any[]>(this.apiGetAll, { params });
  }
  getUserResponesDoctor(){
      return this.http.get<any[]>(this.apiGetUserDoctor);
  }
}

