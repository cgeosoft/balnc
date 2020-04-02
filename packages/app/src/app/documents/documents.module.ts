import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { DocumentsRepo } from './@shared/documents.repo'
import { LinesRepo } from './@shared/lines.repo'
import { ShellComponent } from './@shell/shell.component'
import { CaretTrackerDirective } from './document-line/CaretTrackerDirective'
import { DocumentLineComponent } from './document-line/document-line.component'
import { DocumentComponent } from './document/document.component'

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
      children: [
        { path: ':id', component: DocumentComponent }
      ]
    }])
  ],
  providers: [
    DocumentsRepo,
    LinesRepo
  ]
})
export class DocumentsModule { }
