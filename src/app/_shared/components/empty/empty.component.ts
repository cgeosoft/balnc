import { Component, Input } from '@angular/core';
import { HelperService } from '@balnc/core';

@Component({
  selector: 'common-empty',
  templateUrl: './empty.component.html'
})
export class EmptyComponent {

  @Input() message = 'no items'
  @Input() submessage = null
  @Input() icon = 'expand'

  helperService = HelperService
}
