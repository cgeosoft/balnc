import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { mergeMap } from 'rxjs/operators'
import { Contact } from '../../contacts/@shared/contacts'
import { ContactsRepo } from '../../contacts/@shared/contacts.repo'
import { OrdersRepo } from '../../orders/@shared/orders.repo'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'

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

  constructor (
    private route: ActivatedRoute,
    private contactsService: ContactsRepo,
    private ordersService: OrdersRepo
  ) { }

  ngOnInit () {
    this.order$ = this.route
      .params
      .pipe(
        mergeMap(async params => {
          const order = await this.ordersService.one(params['id'])
          if (order) {
            this.contact = await this.contactsService.one(order.customer)
            return order
          }
        })
      )
  }

}
