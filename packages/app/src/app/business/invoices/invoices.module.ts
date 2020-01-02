import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { InvoiceComponent } from './invoice/invoice.component'
import { InvoicesComponent } from './invoices/invoices.component'

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: InvoicesComponent },
      { path: ':id', component: InvoiceComponent }
    ])
  ]
})
export class InvoicesModule { }
