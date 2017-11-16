import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from '../modules/main/core/core.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
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
