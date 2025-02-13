import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes the service available application-wide as a singleton
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/data';  // URL of the Flask backend API

  constructor(private http: HttpClient) {} // Injects the HttpClient service for making HTTP requests

  // Method to fetch data from the backend API
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Makes a GET request to the apiUrl and returns the response as an observable
  }

  // Method to send data to the backend API
  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Sets the Content-Type header to application/json
    return this.http.post<any>(this.apiUrl, data, { headers }); // Makes a POST request to the apiUrl with the provided data and headers, and returns the response as an observable
  }
}