import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { ScheduleDTO } from "../dtos/schedule.dto";
import { throwError } from "rxjs";
import { CheckTimeSlotDTO } from "../dtos/checkTimeSlot.dto";

@Injectable({
    providedIn: 'root'
  })
  
  export class ScheduleService {
    private apiSchedule = `${environment.apiBaseUrl}/schedules`;
    private apiCheckTimeSlot = `${environment.apiBaseUrl}/schedules/check_timeSlot`;

    constructor(private http: HttpClient) { }

    createSchedule(scheduleDTO: ScheduleDTO){
        return this.http.post(this.apiSchedule,scheduleDTO);
    }

    checkTimeSlot(checkTimeSlotDTO: CheckTimeSlotDTO){
      return this.http.post(this.apiCheckTimeSlot,checkTimeSlotDTO);
    }

    getScheduleByUserId(userId: number, page: number, limit: number){
      const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      return this.http.get<any[]>(`${this.apiSchedule}/user/${userId}`, {params});
    }
    getScheduleByDoctorId(doctorId: number, page: number, limit: number){
      const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      return this.http.get<any[]>(`${this.apiSchedule}/doctor/${doctorId}`, {params});
    }
  }
  