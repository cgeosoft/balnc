import { Component, Input, OnInit } from '@angular/core'
import { MenuItem } from './menu-item'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input('menu') menu: MenuItem[]

  constructor () { }

  ngOnInit () {
  }

}
