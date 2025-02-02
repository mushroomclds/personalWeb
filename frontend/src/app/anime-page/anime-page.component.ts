import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-anime-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container mx-auto py-6">
    <h1 class="text-5xl font-bold mb-6" style="text-align:center">Anime Page</h1>
    <div class="carousel flex justify-center">
      <div 
        *ngFor="let anime of TopAnimes; let i = index" 
        [id]="'slide' + (i + 1)" 
        class="carousel-item relative w-full" 
        [class.hidden]="i !== currentSlide">
          <div class="hero bg-base-200 min-h-screen">
            <div class="hero-content flex-col lg:flex-row">
              <img [src]="anime.file" alt="anime"
                class="max-w-sm rounded-lg shadow-2xl" />
              <div>
                <h1 class="text-5xl font-bold">{{anime.Title}}</h1>
                <p class="py-6">
                  {{anime.Description}}
                </p>
                <button class="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a (click)="prevSlide()" class="btn btn-circle">❮</a>
            <a (click)="nextSlide()" class="btn btn-circle">❯</a>
          </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./anime-page.component.css']
})
export class AnimePageComponent {
  // TopAnimes = ["assets/Naruto.jpg", "assets/MT.jpg", "assets/Frieren.jpg"];
  TopAnimes = [
    { 
      file: "assets/Naruto.jpg",
      Title: "Naruto",
      Description: "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
      rank : 1
    }, 
    {
      file: "assets/MT.jpg",
      Title: "Mushoku Tensei: Jobless Reincarnation",
      Description: "Mushoku Tensei: Jobless Reincarnation is a Japanese light novel series by Rifujin na Magonote. It has been serialized online in the user-generated novel publishing website Shōsetsuka ni Narō since November 2012. ",
      rank : 2
    }, 
    {
      file: "assets/Frieren.jpg",
      Title: "Frieren: Beyond Journey's End",
      Description: "Frieren: Beyond Journey's End is a Japanese manga series written and illustrated by Kanehito Yamada. It has been serialized in Kodansha's seinen manga magazine Weekly Morning since 2018.",
      rank : 3
    }
  ];
  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.TopAnimes.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.TopAnimes.length) % this.TopAnimes.length;
  }
}
