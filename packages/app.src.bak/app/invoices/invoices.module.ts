import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { InvoicesRepo } from './@shared/invoices.repo'
import { ShellComponent } from './@shell/shell.component'
import { InvoiceComponent } from './invoice/invoice.component'
import { InvoicesComponent } from './invoices/invoices.component'

@NgModule({
  declarations: [
    ShellComponent,
    InvoicesComponent,
    InvoiceComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShellComponent }
    ])
  ],
  providers: [
    InvoicesRepo
  ]
})
export class InvoicesModule { }
