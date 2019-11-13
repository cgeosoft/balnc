import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-content-breadcrumb',
  templateUrl: './content-breadcrumb.component.html',
  styleUrls: ['content-breadcrumb.component.scss']
})
export class ContentBreadcrumbComponent {
  @Input() items: any[] = []
}
