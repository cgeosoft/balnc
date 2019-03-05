import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'common-sidebar',
  template: '<ng-content></ng-content>'
})
export class SidebarComponent {
  @Input() closed
  @HostBinding('class.closed') someField: boolean = false
}
