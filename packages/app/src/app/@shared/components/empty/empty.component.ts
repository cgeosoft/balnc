import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['empty.component.scss']
})
export class EmptyComponent {
  @Input() message = 'No Data'
  @Input() submessage = null
  @Input() undraw = 'no-data'
}
