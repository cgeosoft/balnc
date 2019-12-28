import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { CaretTrackerDirective } from './document-line/CaretTrackerDirective'
import { DocumentLineComponent } from './document-line/document-line.component'
import { DocumentComponent } from './document/document.component'
import { ShellComponent } from './shell/shell.component'
import { DocumentsRepo } from './@shared/repos/documents.repo'
import { LinesRepo } from './@shared/repos/lines.repo'

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
