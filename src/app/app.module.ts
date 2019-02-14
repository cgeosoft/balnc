import { NgModule } from '@angular/core'

import { AppComponent } from './_app/app.component'
import { CoreModule } from './_core/core.module'

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
