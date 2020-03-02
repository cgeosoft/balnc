import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PreloadAllModules, RouterModule } from '@angular/router'
import { CoreModule } from '@balnc/core'
import { Angulartics2Module } from 'angulartics2'
import { AppComponent } from './app.component'
import { APP_ROUTES } from './app.routes'
import { BoardsDataModule } from './boards/boards.data.module'
import { BusinessDataModule } from './business/business.data.module'
import { MainModule } from './main/main.module'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    CoreModule,
    Angulartics2Module.forRoot({
      pageTracking: {
        clearIds: true
      }
    }),
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
      // enableTracing: true
    }),
    BusinessDataModule,
    BoardsDataModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
