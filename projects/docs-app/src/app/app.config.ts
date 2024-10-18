import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
} from "@angular/fire/analytics";

import { routes } from "./app.routes";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyC4yr3KWvlAMRy9eTbci8kEixzjewFr094",
        authDomain: "ngx-apexcharts.firebaseapp.com",
        projectId: "ngx-apexcharts",
        storageBucket: "ngx-apexcharts.appspot.com",
        messagingSenderId: "614372460583",
        appId: "1:614372460583:web:cc6c843befee578d6ee602",
        measurementId: "G-VV21NCZ2XR"
      })
    ),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
  ],
};
