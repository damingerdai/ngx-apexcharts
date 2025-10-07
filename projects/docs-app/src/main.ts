import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { unregisterServiceWorkers } from './unregister-service-workers';

// Unregister all installed service workers and force reload the page if there was
// an old service worker from a previous version of the docs.
unregisterServiceWorkers().then(hadServiceWorker => hadServiceWorker && location.reload());

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
