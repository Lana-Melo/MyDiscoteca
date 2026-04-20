/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {App} from './app/app';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';

bootstrapApplication(App, {
  // TODO(user-sprint-1): quando comecarem auth/user a serio, acrescentem aqui
  // o provideHttpClient() (e mais tarde um interceptor para bearer token, se
  // decidirem centralizar a autenticacao no frontend).
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
