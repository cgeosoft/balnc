import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-content-breadcrumb',
  templateUrl: './content-breadcrumb.component.html'
})
export class ContentBreadcrumbComponent implements OnInit {

  @Input() items: any[] = []

  ngOnInit () {

  }
}
