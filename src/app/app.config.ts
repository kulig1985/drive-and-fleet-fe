import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation, withHashLocation,
  withInMemoryScrolling,
  withRouterConfig, withViewTransitions
} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {DropdownModule, SidebarModule} from "@coreui/angular";
import {IconSetService} from "@coreui/icons-angular";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {jwtInterceptor} from "./auth/JwtInterceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
        withRouterConfig({
          onSameUrlNavigation: 'reload'
        }),
        withInMemoryScrolling({
          scrollPositionRestoration: 'top',
          anchorScrolling: 'enabled'
        }),
        withEnabledBlockingInitialNavigation(),
        withViewTransitions(),
        withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    //{provide: LocationStrategy, useClass: HashLocationStrategy}

  ]
};
