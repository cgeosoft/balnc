import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PreloadAllModules, RouterModule } from '@angular/router'
import { ConfigService, CoreModule, RxDBService } from '@balnc/core'
import { AppComponent } from './app.component'
import { initApp, REPOS } from './app.init'
import { APP_ROUTES } from './app.routes'
import { MainModule } from './main/main.module'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    CoreModule,
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
      // enableTracing: true
    })
  ],
  providers: [
    ConfigService,
    RxDBService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initApp,
      deps: [
        ConfigService,
        RxDBService,
        ...REPOS
      ]
    }
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
