import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { CaretTrackerDirective, DocumentLineComponent } from './document-line/document-line.component'
import { DocumentComponent } from './document/document.component'
import { ShellComponent } from './shell/shell.component'
import { DocumentsService } from './_shared/documents.service'

@NgModule({
  declarations: [
    DocumentComponent,
    ShellComponent,
    DocumentLineComponent,
    CaretTrackerDirective
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
