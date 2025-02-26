import { Component } from '@angular/core';
import { AnimeHeroComponent } from '../anime-hero/anime-hero.component';
import { ViewChild, ElementRef } from '@angular/core';
import { FaveColorHeroComponent } from '../fave-color-hero/fave-color-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AnimeHeroComponent, FaveColorHeroComponent,],
  template: ` 
  <header class="hero min-h-screen bg-base-200 relative">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Welcome to My Personal Website</h1>
        <p class="py-6">Maybe you'll learn something about me(:</p>
        <button class="btn btn-primary" (click)="scrollToHero()">Scroll to Next</button>
      </div>
    </div>
    <div class="icon-container">
      <i class="iconA fas fa-star"></i>
      <i class="iconB fas fa-gamepad"></i>
      <i class="iconC fas fa-moon"></i>
    </div>
  </header> <!-- WELCOME HERO -->

  <div #hero>
    <app-anime-hero></app-anime-hero>
  </div> <!-- ANIME HERO -->

  <div>
    <app-fave-color-hero></app-fave-color-hero>
  </div> <!-- FAVE COLOR HERO -->

  <div class="container mx-auto py-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">About Me</h2>
          <p>Some information about me.</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Portfolio</h2>
          <p>Some of my recent works.</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Contact</h2>
          <p>How to reach me.</p>
        </div>
      </div>
    </div>
  </div> <!-- ABOUT, PORTFOLIO, CONTACT -->
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('hero') hero!: ElementRef;

  scrollToHero(): void {
    this.hero.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}