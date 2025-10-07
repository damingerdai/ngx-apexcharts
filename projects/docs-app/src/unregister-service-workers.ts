export async function unregisterServiceWorkers(): Promise<boolean> {
  if (!navigator.serviceWorker) {
    return false;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();

  // Walk through every currently registered Service Worker and unregister it. There can be
  // service workers from previous versions of the Angular Material docs.
  registrations.forEach(registration => registration.unregister());

  return registrations.length > 0;
}