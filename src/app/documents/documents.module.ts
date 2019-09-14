import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { DocumentComponent } from './document/document.component'
import { ShellComponent } from './shell/shell.component'
import { DocumentsService } from './_shared/documents.service'

@NgModule({
  declarations: [
    DocumentComponent,
    ShellComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      resolve: {
        srv: DocumentsService
      },
      children: [
        { path: ':id', component: DocumentComponent }
      ]
    }])
  ],
  providers: [
    DocumentsService
  ]
})
export class DocumentsModule { }
