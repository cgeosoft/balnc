import { Component, NgZone, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { mergeMap } from 'rxjs/operators'
import { Contact } from '../_shared/models/contacts'
import { ContactsRepo } from '../_shared/repos/contacts.repo'
import { OrdersRepo } from '../_shared/repos/orders.repo'
import { StateService } from '../_shared/services/state.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  host: { 'class': 'page' }
})
export class OrderComponent implements OnInit {

  order$: any
  contact$: any

  menu = {
    selected: 'overview',
    items: [{
      id: 'overview',
      label: 'Overview'
    }, {
      id: 'raw',
      label: 'Raw',
      right: true
    }]
  }

  contact: Contact

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private contactsService: ContactsRepo,
    private ordersService: OrdersRepo,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.order$ = this.route
      .params
      .pipe(
        mergeMap(async params => {
          const order = await this.ordersService.one(params['id'])
          if (order) {
            this.contact = await this.contactsService.one(order.data.customer)
            return order
          }
        })
      )
  }

}
