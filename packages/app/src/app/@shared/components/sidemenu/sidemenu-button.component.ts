import { Component, Input } from '@angular/core'
import { MenuItem } from './menu-item'

@Component({
  selector: 'app-sidemenu-button',
  templateUrl: './sidemenu-button.component.html',
  styleUrls: ['./sidemenu-button.component.scss']
})
export class SidemenuButtonComponent {

  @Input() item: MenuItem

}
