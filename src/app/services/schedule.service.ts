import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ScheduleDTO } from "../dtos/schedule.dto";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  
  export class ScheduleService {
    private apiPostSchedule = `${environment.apiBaseUrl}/schedules`;

    constructor(private http: HttpClient) { }

    createSchedule(scheduleDTO: ScheduleDTO){
        return this.http.post(this.apiPostSchedule,scheduleDTO);
    }
  }
  