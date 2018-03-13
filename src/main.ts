import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ApplicationRef } from "@angular/core";
import { enableDebugTools } from "@angular/platform-browser";

import { AppModule } from './modules/_app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  console.log("PROD")
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((module) => {
    const applicationRef = module.injector.get(ApplicationRef);
    const appComponent = applicationRef.components[0];
    enableDebugTools(appComponent);
  })
