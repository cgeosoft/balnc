import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from '@balnc/core';
import { SharedModule } from '@balnc/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import environment from '../environments/environment';
import { AppComponent } from './_app/app.component';
import { APP_ROUTES } from './_app/app.routes';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    CoreModule,
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, {
      // enableTracing: true
    })
  ],
  declarations: [
    AppComponent,
    ShellComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
