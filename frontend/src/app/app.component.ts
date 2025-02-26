import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ],
  template: `  
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="#">My Website</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/about">About</a></li>
        <li><a routerLink="/portfolio">Portfolio</a></li>
        <li><a routerLink="/contact">Contact</a></li>
      </ul>
    </div>
  </div>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button (click)="sendData()">Send Data</button>
    <div *ngIf="postDataResponse">
      <p>Response: {{ postDataResponse | json }}</p>
    </div>
    <button (click)="sendTestOracle()">Send Data Oracle Test</button>
    <div *ngIf="postDataResponseOracle">
      <p>Response: {{ postDataResponseOracle | json }}</p>
    </div>
  </div>
  <router-outlet></router-outlet>
  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>&copy; 2025 My Personal Website</p>
    </div>
  </footer>
  `,
  styleUrls: ['./app.component.css'],
  providers:[ApiService]
})
export class AppComponent {

  title = 'personalWeb';
  message!: string;
  postDataResponse: any;
  postDataResponseOracle: any;

  constructor(private apiService: ApiService) {}


  sendData(): void {
    const data = { example: 'This is a test' };
    this.apiService.postData(data).subscribe(
      response => {
        this.postDataResponse = response; // receives confirmation from the backend API
      },
      error => {
        console.error('Error posting data', error);
      }
    );
  }

  sendTestOracle(): void {
    const data = { example: 'testing oracle' };
    this.apiService.postTestOracle(data).subscribe(
      response => {
        this.postDataResponseOracle = response; // receives confirmation from the backend API
      },
      error => {
        console.error('Error posting data', error);
      }
    );
  }
}