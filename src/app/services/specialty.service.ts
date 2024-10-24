import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SpecialtyService{
    private getSpecialiesAll  = `${environment.apiBaseUrl}/specialties`;
    
    constructor(private http: HttpClient){}
    
    getSpecialies(): Observable<any>{
        return this.http.get<any[]>(this.getSpecialiesAll)
    }
}
