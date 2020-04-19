import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '@balnc/shared'

@Component({
  selector: 'app-payments-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  menu: MenuItem[] = [{
    label: 'Overview',
    type: 'button',
    icon: 'border-all',
    route: ['/payments/overview']
  }, {
    label: 'Transactions',
    type: 'button',
    icon: 'calendar-alt',
    route: ['/payments/transactions']
  }, {
    label: 'Accounts',
    type: 'button',
    icon: 'calendar-alt',
    route: ['/payments/accounts']
  }]

  constructor (
    private router: Router
  ) { }

  ngOnInit () {
  }
}
