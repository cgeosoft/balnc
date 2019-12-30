import { Component, HostBinding, Input } from '@angular/core'

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['content-body.component.scss']
})
export class ContentBodyComponent {
  @Input() @HostBinding('class.padding') padding: boolean = true
}
