import {Routes} from '@angular/router';
import {AppComponent} from './app.component'; //default component for default route
import { HomeComponent } from './home/home.component';
import { AnimePageComponent } from './anime-page/anime-page.component';
//<router-outlet></router-outlet> is a placeholder for the component 
// that will be rendered when the route changes.

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'anime-page',
      component: AnimePageComponent,
      title: 'Anime page',
    },
  ];
  export default routeConfig;