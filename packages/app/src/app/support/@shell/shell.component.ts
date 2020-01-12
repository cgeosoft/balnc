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
      type: 'PAGE',
      label: 'FAQ'
    },
    {
      url: '/support/live',
      icon: 'concierge-bell',
      type: 'PAGE',
      label: 'Live Chat'
    },
    {
      url: '/support/about',
      icon: 'info-circle',
      type: 'PAGE',
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
