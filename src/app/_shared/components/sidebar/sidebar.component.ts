import { Component, Input } from '@angular/core';

@Component({
  selector: 'common-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @Input() closed
}
