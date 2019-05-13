import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContactsService } from './services/contacts.service';
import { InvoicesService } from './services/invoices.service';
import { OrdersService } from './services/orders.service';

@Injectable()
export class Resolver implements Resolve<void> {
  constructor(
    private contactsService: ContactsService,
    private invoicesService: InvoicesService,
    private ordersService: OrdersService
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    await this.contactsService.setup()
    await this.invoicesService.setup()
    await this.ordersService.setup()
  }
}
