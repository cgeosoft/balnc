import { Component, Input } from '@angular/core';

@Component({
  selector: 'common-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  @Input() label
}
