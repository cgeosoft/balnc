import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helpers } from '@balnc/shared';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { CEvent, CEventType, Contact, ContactType } from '../_shared/models/contacts';
import { ContactsService } from '../_shared/services/contacts.service';
import { OrdersService } from '../_shared/services/orders.service';
import { StateService } from '../_shared/services/state.service';

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

  badges = {
    ContactAccessed: { label: 'Contact Accessed', color: '#78909C' },
    ContactCreated: { label: 'Contact Created', color: '#9FA8DA' },
    ContactUpdated: { label: 'Contact Updated', color: '#D4E157' },
    ConnectionCreated: { label: 'Connection Created', color: '#66BB6A' },
    ConnectionRemoved: { label: 'Connection Removed', color: '#ef5350' },
    OrderCreated: { label: 'Order Created', color: '#66BB6A' },
    OrderRemoved: { label: 'Order Removed', color: '#ef5350' },
    InvoiceCreated: { label: 'Invoice Created', color: '#66BB6A' },
    InvoiceRemoved: { label: 'Invoice Removed', color: '#ef5350' }
  }

  tabsMenu = {
    selected: 'timeline',
    tabs: [{
      id: 'timeline',
      label: 'Timeline'
    }, {
      id: 'manage',
      label: 'Manage'
    }, {
      id: 'raw',
      label: 'Raw',
      right: true
    }]
  }

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private contactsService: ContactsService,
    private ordersService: OrdersService,
    private zone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contact$ = this.route
      .params
      .pipe(
        mergeMap(params => this.contactsService.getContactObservable(params['id'])),
        // map((params) => {
        //   return {
        //     contact: this.contactsService.getContact(params['id']),
        //     cevents: this.contactsService.db['cevents'].$.find().where('contact').eq(params['id']).exec()
        //   }
        // }),
        tap((contact) => {
          this.stateService.add({
            key: contact['_id'],
            label: contact.name,
            sublabel: contact['_id'],
            image: contact.details.avatar,
            route: [`/business/contacts`, contact['_id']],
            type: ContactType[contact.type]
          })
          this.cevents$ = this.contactsService.db['cevents']
            .find()
            .where('contact')
            .eq(contact['_id'])
            .$.pipe(
              tap((cevents: CEvent[]) => cevents.sort((a, b) => b.date - a.date))
            )
        })
      )
  }

  async createOrder() {
    const order = await this.ordersService.addOrder({
      serial: Helpers.uid(),
      customer: this.route.snapshot.params['id']
    })
    await this.contactsService.addOne<CEvent>('cevents', {
      contact: this.route.snapshot.params['id'],
      comment: `add new order #${order['serial']}`,
      reference: `/business/orders/${order['_id']}`,
      date: Date.now(),
      type: CEventType.OrderCreated
    })
    await this.router.navigate([`/business/orders`, order['_id']])
  }
}
