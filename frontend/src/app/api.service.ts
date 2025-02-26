import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from './api.routes';


@Injectable({
  providedIn: 'root', // This makes the service available application-wide as a singleton
})
export class ApiService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {} // Injects the HttpClient service for making HTTP requests

  // Method to fetch data from the backend API
  getData(): Observable<any> {
    return this.http.get<any>(`${API_ROUTES.BASE_URL}${API_ROUTES.DATA}`);
  }

  // Method to send data to the backend API
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.BASE_URL}${API_ROUTES.DATA}`, data, { headers: this.headers });
  }

  // Method to send data to the backend API database
  postTestOracle(data: any): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.BASE_URL}${API_ROUTES.TEST_ORACLE}`, data, { headers: this.headers });
  }

  // Method to send data to the backend API database
  postFaveColorInput(data: any): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.BASE_URL}${API_ROUTES.FAVE_COLOR_INPUT}`, data, { headers: this.headers });
  }
}