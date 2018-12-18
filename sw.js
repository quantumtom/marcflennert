import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  const registration = runtime.register();

  console.log('Service Worker Registered via serviceworker-webpack-plugin');

  console.dir(registration);
}
