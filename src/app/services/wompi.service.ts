import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { WompiDataResponse } from '../interfaces/wompiData.interface';

@Injectable({ providedIn: 'root' })
export class WompiService {
	url: string = "https://localhost:44311/api";

	constructor(private httpClient: HttpClient) { }

	createUrl(wompiData: WompiDataResponse): Observable<any> {
		return this.httpClient.post(`${this.url}/create-link`, wompiData)
	}

	getTransactionByIdLinkWompi(id: string): Observable<any> {
		const params = new HttpParams().set('idLinkWompi', id);
		return this.httpClient.get<any>(`${this.url}/get-event`, { params });
	}
}