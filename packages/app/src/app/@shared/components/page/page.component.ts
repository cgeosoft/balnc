import { Component } from '@angular/core'
import { Observable } from 'rxjs'

interface Sidebar {
  title: string
  menu: any[],
  search: any,
  marked?: {
    data$: Observable<{label: string,url: string,icon: string[]}[]>
  }
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['page.component.scss']
})
export class PageComponent {
}
