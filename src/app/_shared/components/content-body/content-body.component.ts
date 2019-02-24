import { Component, Input } from '@angular/core';

@Component({
  selector: 'common-content-body',
  templateUrl: './content-body.component.html'
})
export class ContentBodyComponent {
  @Input() fullWidth = false
}
