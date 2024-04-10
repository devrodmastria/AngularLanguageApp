(window as any).process = {
  env: { DEBUG: undefined },
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//const googleLoginProvider = import.meta.resolve("secretgooglecode", "NODE_ENV").valueOf()
// const googleLoginProvider = import.meta.resolve("secretgooglecode").valueOf();
// const googleLoginProvider = process.env['GOOGLE_LOGIN_MODULE'] || "googleKey";
const googleLoginProvider = '${secretgooglecode}'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideHttpClient(),
       //We are building a provider. Version 2.2.0 of package doesn't provide one.
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,

        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              googleLoginProvider
            ),
          },
        ],
        onError: (err) => {
          debugger;
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }, provideAnimationsAsync(),

  ]


  
  
};
