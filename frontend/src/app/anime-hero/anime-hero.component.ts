import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anime-hero',
  standalone: true,
  imports: [RouterModule],
  template: `
  <div
  class="hero min-h-screen"
  style="background-image: url({{animeBackground}}); background-position: right;">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-neutral-content text-center">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Anime</h1>
      <p class="mb-5">
         I like anime
      </p>
      <button class="btn btn-primary" [routerLink]="['/anime-page']">Learn More</button>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./anime-hero.component.css']
})
export class AnimeHeroComponent {
  animeBackground = 'assets/Vivy-Fluorite-Eyes.jpg';


}
