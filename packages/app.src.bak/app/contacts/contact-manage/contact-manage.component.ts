import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Contact } from '../@shared/contacts'
import { ContactsRepo } from '../@shared/contacts.repo'

@Component({
  selector: 'app-contact-manage',
  templateUrl: './contact-manage.component.html'
})
export class ContactManageComponent implements OnInit {

  contact$: Observable<Contact>

  constructor (
    private route: ActivatedRoute,
    private contactsRepo: ContactsRepo
  ) { }

  ngOnInit () {
    this.contact$ = this.route.parent.params.pipe(
      mergeMap(params => this.contactsRepo.one$(params.id))
    )
  }

}
