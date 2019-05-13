import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactComponent } from './contact/contact.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderComponent } from './order/order.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { EmptyComponent } from './_empty/empty.component';
import { Resolver } from './_shared/resolver';
import { ContactsService } from './_shared/services/contacts.service';
import { InvoicesService } from './_shared/services/invoices.service';
import { OrdersService } from './_shared/services/orders.service';
import { StateService } from './_shared/services/state.service';
import { ShellComponent } from './_shell/shell.component';

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
        { path: '', component: EmptyComponent },
        { path: 'contacts/:id', component: ContactComponent },
        { path: 'orders/:id', component: OrderComponent },
        { path: 'search', component: SearchComponent },
        { path: 'invoices/:id', component: InvoiceComponent },
        { path: 'settings', component: SettingsComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ]
    }])
  ],
  declarations: [
    ShellComponent,
    ContactComponent,
    SettingsComponent,
    QuickSearchComponent,
    OrderComponent,
    InvoiceComponent,
    SearchComponent,
    EmptyComponent,
    ContactCreateComponent,
    OrderCreateComponent
  ],
  providers: [
    Resolver,
    ContactsService,
    InvoicesService,
    OrdersService,
    StateService
  ],
  entryComponents: [
    QuickSearchComponent,
    ContactCreateComponent,
    OrderCreateComponent
  ]
})
export class BusinessModule { }
