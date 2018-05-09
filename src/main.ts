import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
// import { ApplicationRef } from "@angular/core";
// import { enableDebugTools } from "@angular/platform-browser";

import { AppModule } from './app/app.module'
import { ENV } from 'environments/environment'

if (ENV.isProd) {
  console.log("Production Mode")
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // .then((module) => {
  //   const applicationRef = module.injector.get(ApplicationRef);
  //   const appComponent = applicationRef.components[0];
  //   enableDebugTools(appComponent);
  // })
