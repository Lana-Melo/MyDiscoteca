/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {App} from './app/app';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import routeConfig from './app/routes';

bootstrapApplication(App, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient()
  ],
}).catch((err) => console.error(err));
