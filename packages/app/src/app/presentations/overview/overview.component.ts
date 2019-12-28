import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Presentation } from '../@shared/models/presentation'
import { PresentationsRepo } from '../@shared/repos/presentations.repo'

@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  host: { 'class': 'page' }
})
export class OverviewComponent implements OnInit {

  presentations$: Observable<any[]>

  schema: TableSchema = {
    name: 'contacts',
    properties: [
      {
        label: 'Presentation',
        type: 'link',
        style: { 'min-width': '300px' },
        locked: true,
        val: (item: Presentation) => {
          return {
            label: item.title,
            link: ['/presentations', item._id]
          }
        }
      },
      { label: 'Files', template: 'files', style: { width: '150px' }, val: (item: Presentation) => { return item['stats'] } },
      { label: 'Last Edit', type: 'date', val: (item: Presentation) => { return item.dateUpdated } }
    ]
  }

  constructor (
    private presentationsRepo: PresentationsRepo
  ) { }

  async ngOnInit () {
    this.presentations$ = this.presentationsRepo.all$()
  }
}
