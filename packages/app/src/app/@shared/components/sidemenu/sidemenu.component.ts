import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input('menu') menu

  constructor () { }

  ngOnInit () {
  }

}
