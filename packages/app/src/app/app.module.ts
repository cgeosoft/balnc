import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { CoreModule } from '@balnc/core'
import { AppComponent } from './app.component'
import { APP_ROUTES } from './app.routes'
import { MainModule } from './main/main.module'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    CoreModule,
    RouterModule.forRoot(APP_ROUTES, {
      // enableTracing: true
    })
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
