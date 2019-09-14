import { Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  template: '<ng-content></ng-content>',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  @Input() closed
  @HostBinding('class.closed') someField: boolean = false
}
