import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ContactsService } from '../../contacts.service'
import { Company } from '../../models/company'

@Component({
  selector: 'contacts-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  company: Company

  constructor (
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        this.company = await this.contactsService.getCompany(params['id'])
      })
  }
}
