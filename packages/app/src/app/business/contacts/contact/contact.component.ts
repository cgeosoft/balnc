import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Helpers, TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { map, mergeMap, tap } from 'rxjs/operators'
import { CEvent, CEventType, Contact, ContactType } from '../../_shared/models/contacts'
import { CEventsRepo } from '../../_shared/repos/cevents.repo'
import { ContactsRepo } from '../../_shared/repos/contacts.repo'
import { OrdersRepo } from '../../_shared/repos/orders.repo'
import { StateService } from '../../_shared/services/state.service'

@Component({
  selector: 'app-contacts-contact',
  templateUrl: './contact.component.html',
  host: { 'class': 'page' }
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
      {
        label: 'Type', type: 'badge', locked: true, badges: {
          ContactAccessed: { label: 'Contact Accessed', color: '#78909C' },
          ContactCreated: { label: 'Contact Created', color: '#9FA8DA' },
          ContactUpdated: { label: 'Contact Updated', color: '#D4E157' },
          ConnectionCreated: { label: 'Connection Created', color: '#66BB6A' },
          ConnectionRemoved: { label: 'Connection Removed', color: '#ef5350' },
          OrderCreated: { label: 'Order Created', color: '#66BB6A' },
          OrderRemoved: { label: 'Order Removed', color: '#ef5350' },
          InvoiceCreated: { label: 'Invoice Created', color: '#66BB6A' },
          InvoiceRemoved: { label: 'Invoice Removed', color: '#ef5350' },
          AgreementCreated: { label: 'Agreement Created', color: '#66BB6A' }
        }, val: (item: CEvent) => item.type
      },
      { label: 'Comment', locked: true, val: (item: CEvent) => item.contact },
      { type: 'button', locked: true, icon: 'link', click: (item: CEvent) => item.comment }
    ]
  }

  menu = {
    selected: 'timeline',
    items: [{
      id: 'timeline',
      label: 'Timeline'
    }, {
      id: 'manage',
      label: 'Manage'
    }, {
      id: 'raw',
      label: 'Raw Data'
    }]
  }
  breadcrumb

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private contactsService: ContactsRepo,
    private ceventsService: CEventsRepo,
    private ordersService: OrdersRepo,
    private router: Router
  ) { }

  ngOnInit() {
    this.contact$ = this.route
      .params
      .pipe(
        mergeMap(params => this.contactsService.one$(params['id'])),
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
            image: contact.details.avatar,
            route: [`/business/contacts`, contact._id],
            type: ContactType[contact.type]
          })
          this.cevents$ = this.ceventsService.all$().pipe(
            map((cevents: CEvent[]) => cevents.filter((cevent) => cevent.contact === contact._id)),
            tap((cevents: CEvent[]) => cevents.sort((a, b) => b._timestamp - a._timestamp))
          )

          this.breadcrumb = [
            { url: ['/business/contacts'], label: 'Contacts' },
            { label: contact.name }
          ]
        })
      )
  }

  async createOrder() {
    const order = await this.ordersService.add({
      serial: Helpers.uid(),
      customer: this.route.snapshot.params['id']
    })
    await this.ceventsService.add({
      contact: this.route.snapshot.params['id'],
      comment: `add new order #${order['serial']}`,
      reference: `/business/orders/${order['_id']}`,
      type: CEventType.OrderCreated
    })
    await this.router.navigate([`/business/orders`, order['_id']])
  }
}
