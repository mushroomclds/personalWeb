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
export class AppComponent implements OnInit {

  title = 'personalWeb';
  message!: string;
  postDataResponse: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      data => {
        this.message = data.message;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  sendData(): void {
    const data = { example: 'This is a test' };
    this.apiService.postData(data).subscribe(
      response => {
        this.postDataResponse = response;
      },
      error => {
        console.error('Error posting data', error);
      }
    );
  }
}