import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html'
})
export class StatusbarComponent {

  @Input() data

}
