import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private apiGetServices = `${environment.apiBaseUrl}/services`;

    constructor(private http: HttpClient) { }

    getServices(
        page: number, 
        limit: number, 
        keyword: string, 
        selectedCategoryId: number
    ):Observable<any> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', selectedCategoryId)
            .set('page', page.toString())
            .set('limit', limit.toString());
    return this.http.get<any[]>(this.apiGetServices, {params});
    }

    getServicesByIds(selectServiceId: number[]){
        return this.http.post(`${this.apiGetServices}/getByIds`, selectServiceId);
    }
}
