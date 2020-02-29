import { Component } from '@angular/core'

@Component({
  selector: 'app-settings-debug',
  templateUrl: './debug.component.html'
})
export class DebugComponent {

  throwError () {
    throw Error('test error')
  }

}
