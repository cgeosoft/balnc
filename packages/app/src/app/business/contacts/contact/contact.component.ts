import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Helpers } from '@balnc/shared'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { CEventType, Contact, ContactType } from '../../@shared/models/contacts'
import { CEventsRepo } from '../../@shared/repos/cevents.repo'
import { ContactsRepo } from '../../@shared/repos/contacts.repo'
import { OrdersRepo } from '../../@shared/repos/orders.repo'

@Component({
  selector: 'app-contacts-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  eventType = CEventType
  contactType = ContactType

  contact$: Observable<Contact>

  constructor (
    private route: ActivatedRoute,
    private contactsRepo: ContactsRepo,
    private ceventsRepo: CEventsRepo,
    private ordersRepo: OrdersRepo,
    private router: Router
  ) { }

  ngOnInit () {

    this.contact$ = this.route.params.pipe(
      mergeMap(params => this.contactsRepo.one$(params['id'])),
      tap(async (contact) => {
        if (!contact) {
          await this.router.navigate([`/business/contacts`])
        }
        this.route.snapshot.data.breadcrumb = contact.name
      })
    )
  }

  async createOrder () {
    const order = await this.ordersRepo.add({
      serial: Helpers.uid(),
      customer: this.route.snapshot.params['id']
    })
    await this.ceventsRepo.add({
      contact: this.route.snapshot.params['id'],
      comment: `add new order #${order['serial']}`,
      reference: `/business/orders/${order._id}`,
      type: CEventType.OrderCreated
    })
    await this.router.navigate([`/business/orders`, order._id])
  }

  async toggleMark (id: string) {
    await this.contactsRepo.mark(id)
  }
}
