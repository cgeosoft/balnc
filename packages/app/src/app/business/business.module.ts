import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { InvoiceComponent } from './invoice/invoice.component'
import { OrderCreateComponent } from './order-create/order-create.component'
import { OrderComponent } from './order/order.component'
import { QuickSearchComponent } from './quick-search/quick-search.component'
import { SearchComponent } from './search/search.component'
import { SettingsComponent } from './settings/settings.component'
import { Resolver } from './_shared/resolver'
import { AgreementsService } from './_shared/services/agreements.service'
import { ContactsService } from './_shared/services/contacts.service'
import { InvoicesService } from './_shared/services/invoices.service'
import { OrdersService } from './_shared/services/orders.service'
import { StateService } from './_shared/services/state.service'
import { ShellComponent } from './_shell/shell.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      resolve: {
        setup: Resolver
      },
      children: [
        { path: 'orders/:id', component: OrderComponent },
        { path: 'search', component: SearchComponent },
        { path: 'invoices/:id', component: InvoiceComponent },
        { path: 'settings', component: SettingsComponent },
        {
          path: 'contacts',
          loadChildren: './contacts/contacts.module#ContactsModule'
        }, {
          path: 'agreements',
          loadChildren: './agreements/agreements.module#AgreementsModule'
        },
        { path: '', redirectTo: 'contacts', pathMatch: 'full' }
      ]
    }])
  ],
  declarations: [
    ShellComponent,
    SettingsComponent,
    QuickSearchComponent,
    OrderComponent,
    InvoiceComponent,
    SearchComponent,
    OrderCreateComponent
  ],
  providers: [
    Resolver,
    ContactsService,
    InvoicesService,
    OrdersService,
    StateService,
    AgreementsService
  ],
  entryComponents: [
    QuickSearchComponent,
    OrderCreateComponent
  ]
})
export class BusinessModule { }
