import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { StorageComponent } from './storage/storage.component'

@NgModule({
  declarations: [
    StorageComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: StorageComponent }
    ])
  ],
})
export class StorageModule { }
