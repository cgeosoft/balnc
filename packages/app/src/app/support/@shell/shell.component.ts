import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-support-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  sidebar = {
    title: 'Support',
    menu: [{
      url: '/support/faq',
      icon: ['far', 'question-circle'],
      type: 'button',
      label: 'FAQ'
    },
    {
      url: '/support/live',
      icon: 'concierge-bell',
      type: 'button',
      label: 'Live Chat'
    },
    {
      url: '/support/about',
      icon: 'info-circle',
      type: 'button',
      label: 'About'
    }]
  }

  constructor () {
    // todo
  }

  ngOnInit () {
    // todo
  }

}
