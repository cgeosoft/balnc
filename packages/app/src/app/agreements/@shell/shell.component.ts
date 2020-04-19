import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '@balnc/shared'

@Component({
  selector: 'app-agreements-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  menu: MenuItem[] = [{
    label: 'Overview',
    type: 'button',
    icon: 'border-all',
    route: ['/agreements/overview']
  }]

  constructor (
    private router: Router
  ) { }

  ngOnInit () {
  }
}
