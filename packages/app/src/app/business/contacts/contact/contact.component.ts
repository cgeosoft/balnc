import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Helpers, TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { CEvent, CEventType, CEventTypeBadges, Contact, ContactType } from '../../@shared/models/contacts'
import { CEventsRepo } from '../../@shared/repos/cevents.repo'
import { ContactsRepo } from '../../@shared/repos/contacts.repo'
import { OrdersRepo } from '../../@shared/repos/orders.repo'
import { StateService } from '../../@shared/services/state.service'

@Component({
  selector: 'app-contacts-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  eventType = CEventType
  contactType = ContactType

  contact$: Observable<Contact>
  cevents$: Observable<CEvent[]>

  schema: TableSchema = {
    name: 'contact-events',
    properties: [
      { label: 'Date', type: 'date', locked: true, val: (item: CEvent) => item._timestamp },
      { label: 'Type', type: 'badge', locked: true, badges: CEventTypeBadges, val: (item: CEvent) => CEventType[item.type] },
      { label: 'Comment', locked: true, val: (item: CEvent) => item.contact },
      { type: 'button', locked: true, icon: 'link', click: (item: CEvent) => item.comment }
    ]
  }

  menu = [
    {
      items: [
        { label: 'Timeline', url: 'timeline', relative: true },
        { label: 'Manage', url: 'manage', relative: true }
      ]
    },
    {
      items: [
        { label: 'Agreements', url: '/business/agreements' },
        { label: 'Orders', url: '/business/orders' },
        { label: 'Invoices', url: '/business/invoices' }
      ]
    }
  ]

  constructor (
    private route: ActivatedRoute,
    private stateService: StateService,
    private contactsRepo: ContactsRepo,
    private ceventsRepo: CEventsRepo,
    private ordersRepo: OrdersRepo,
    private router: Router
  ) { }

  ngOnInit () {

    this.contact$ = this.route.params.pipe(
      mergeMap(params => this.contactsRepo.one$(params['id'])),
      // map((params) => {
      //   return {
      //     contact: this.contactsService.getContact(params['id']),
      //     cevents: this.contactsService.db['cevents'].$.find().where('contact').eq(params['id']).exec()
      //   }
      // }),
      tap(async (contact) => {
        if (!contact) {
          await this.router.navigate([`/business/contacts`])
          return
        }
        this.stateService.add({
          key: contact._id,
          label: contact.name,
          sublabel: contact._id,
          image: contact.avatar,
          route: [`/business/contacts`, contact._id],
          type: ContactType[contact.type]
        })
        this.cevents$ = this.ceventsRepo.all$().pipe(
          map((cevents: CEvent[]) => cevents.filter((cevent) => cevent.contact === contact._id)),
          tap((cevents: CEvent[]) => cevents.sort((a, b) => b._timestamp - a._timestamp))
        )

        this.route.snapshot.data.breadcrumb.label = contact.name
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
}
