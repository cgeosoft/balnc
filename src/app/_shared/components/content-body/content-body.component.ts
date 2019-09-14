import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html'
})
export class ContentBodyComponent {
  @Input() fullWidth = false
}
