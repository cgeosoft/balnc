import { Component, Input } from '@angular/core'

@Component({
  selector: 'common-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() label
}
