import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['content.component.scss']
})
export class ContentComponent {
  @Input() sidebar = false
  // @Input() @HostBinding('class.padding') padding: boolean = true
  // @Input() @HostBinding('class.full') full: boolean = false
  // @Input() @HostBinding('class.divider') divider: boolean = true
}
