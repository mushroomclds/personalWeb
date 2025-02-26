import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ApiService } from '../api.service';

@Component({
  selector: 'app-fave-color-hero',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule], // Add CommonModule here
  template: `
    <div class="hero min-h-screen" style="background-image: url({{ background }}); background-position: right;">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">About You</h1>
          <p class="mb-5">What is your favorite color?</p>
          
          <!-- Dropdown to select favorite color -->
          <select [(ngModel)]="selectedColor" [disabled]="isSubmitted" class="select select-bordered w-full max-w-xs">
            <option *ngFor="let color of colors" [value]="color">{{ color }}</option>
          </select>
          
          <!-- Submit Button -->
          <button 
            class="btn btn-primary mt-5" 
            (click)="sendColorInput()" 
            [disabled]="isSubmitted || !selectedColor">
            Submit
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./fave-color-hero.component.css'],
  providers:[ApiService]
})
export class FaveColorHeroComponent {
  background = 'assets/colors2.jpg';
  colors = ['Blue', 'Red', 'Green', 'Black', 'White', 'Gray', 'Yellow', 'Purple', 'Orange', 'Pink']; // Array of color options
  selectedColor: string = '';  // Holds the selected color
  isSubmitted = false;  // Track if the user has already submitted
  postDataResponse: any; // Response from the API

  // Check if the user has already submitted (from localStorage or any other method)
  ngOnInit() {
    // If you're in a development environment, allow for multiple submissions for testing
    if (localStorage.getItem('colorSubmitted') === 'true' && !this.isInDevMode()) {
      this.isSubmitted = true;
    }
  }
  
  constructor(private apiService: ApiService) {}

  isInDevMode(): boolean {
    return window.location.hostname === '127.0.0.1'; // Check if the app is running locally for testing
  }

  // Function to simulate the API call
  sendColorInput() : void {
    if (!this.selectedColor) return;

    // Call your API function here (e.g., an API service)
    console.log('Selected Color:', this.selectedColor);

    // Once the color is submitted, prevent further submissions
    if (!this.isInDevMode()) {
      this.isSubmitted = true;
    }

    const colorData = { color: this.selectedColor }; 
    this.apiService.postFaveColorInput(colorData).subscribe(
      response => {
        this.postDataResponse = response; // receives confirmation from the backend API
      },
      error => {
        console.error('Error posting FaveColorInput', error);
      }
    );

    // Optionally, store this in localStorage to prevent submission even after page reload
    localStorage.setItem('colorSubmitted', 'true');
  }

  
}
