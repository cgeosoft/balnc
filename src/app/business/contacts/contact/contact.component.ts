import { Component, NgZone, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Helpers, TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { CEvent, CEventType, Contact, ContactType } from '../../_shared/models/contacts'
import { ContactsService } from '../../_shared/services/contacts.service'
import { OrdersService } from '../../_shared/services/orders.service'
import { StateService } from '../../_shared/services/state.service'

// <ng-container *ngIf="cevents$ | async as cevents; else loader">
// <ng-container *ngIf="cevents; else empty">
//   <table class="table">
//     <thead>
//       <th style="width:210px;">Date</th>
//       <th style="width:130px;">Type</th>
//       <th>Comment</th>
//     </thead>
//     <tbody>
//       <tr *ngFor="let cevent of cevents">
//         <td>{{cevent.date|date:"yyyy-MM-dd HH:mm:ss"}}</td>
//         <td>
//           <span class="d-block badge badge-pill badge-dark mt-1"
//             [ngStyle]="{background:badges[eventType[cevent.type]].color}">
//             {{badges[eventType[cevent.type]].label}}</span>
//         </td>
//         <td>
//           <div class="d-flex">
//             <span>{{cevent.comment}}</span>
//             <a *ngIf="cevent.reference" [routerLink]="[cevent.reference]"
//               class="btn btn-sm btn-outline-primary border-0 py-0 ml-auto">
//               <fa-icon icon="external-link-alt"></fa-icon> Open
//             </a>
//           </div>
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </ng-container>
// </ng-container>
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
      { label: 'Date', type: 'date', locked: true, val: (item: CEvent) => { return item.date } },
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
        }, val: (item: CEvent) => { return item.type }
      },
      { label: 'Comment', locked: true, val: (item: CEvent) => { return item.comment } },
      { type: 'button', locked: true, icon: 'link', click: async (item: CEvent) => { return item.comment } }
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
      label: 'Raw',
      right: true
    }]
  }
  breadcrumb

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService,
    private contactsService: ContactsService,
    private ordersService: OrdersService,
    private zone: NgZone,
    private router: Router
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

          this.breadcrumb = [
            { url: ['/business/contacts'], label: 'Contacts' },
            { label: contact.name }
          ]
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
