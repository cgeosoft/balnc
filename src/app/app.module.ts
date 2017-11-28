import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// import { EllipsisPipe } from '../pipes/ellipsis.pipe';

import { CoreModule } from '../modules/main/core/core.module';
import { DatabaseModule } from '../modules/main/database/database.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // EllipsisPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    DatabaseModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent,
      }
    ], {
        enableTracing: true
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
