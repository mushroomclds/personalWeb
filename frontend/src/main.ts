import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig),provideHttpClient()],
}).catch((err) => console.error(err));