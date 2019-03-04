import { Component, Input } from '@angular/core';

@Component({
  selector: 'common-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() version
}
