import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ContactsRepo } from '../business/@shared/repos/contacts.repo'

@Component({
  selector: 'app-core-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu: any
  profile: any

  data = {
    customers: [{ name: 'customers', value: 55403 }]
  }
  contacts$: Observable<number>

  constructor (
    private configService: ConfigService,
    private contactsRepo: ContactsRepo,
    private router: Router
  ) { }

  ngOnInit () {
    this.profile = this.configService.profile
    this.contacts$ = this.contactsRepo.all$().pipe(
      map(contacts => contacts.length)
    )
  }
}
