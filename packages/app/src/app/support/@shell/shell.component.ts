import { Component } from '@angular/core'
import { MenuItem } from '@balnc/shared'

@Component({
  selector: 'app-support-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent {

  menu: MenuItem[] = [{
    route: '/support/faq',
    icon: ['far', 'question-circle'],
    type: 'button',
    label: 'FAQ'
  },
  {
    route: '/support/live',
    icon: 'concierge-bell',
    type: 'button',
    label: 'Live Chat'
  },
  {
    route: '/support/about',
    icon: 'info-circle',
    type: 'button',
    label: 'About'
  }]
}
