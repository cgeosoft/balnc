import { Component } from '@angular/core'

@Component({
  selector: 'app-settings-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent {

  throwError () {
    throw Error('test error')
  }

}
