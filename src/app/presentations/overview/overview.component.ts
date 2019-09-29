import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { Presentation } from '../_shared/models/presentation'
import { PresentationsService } from '../_shared/services/presentations.service'

// <table class="table table-max">
//           <thead>
//             <tr>
//               <th>Presentation</th>
//               <th>Files</th>
//               <th>Last Edit</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr *ngFor="let presentation of presentations">
//               <td>
//                 <div class="d-flex flex-row align-items-start">
//                   <div class="presentation-thumbnail">
//                     <ng-container *ngIf="presentation.thumb; else noImg">
//                       <div class="img-thumb" [ngStyle]="{'background-image': 'url('+presentation.thumb+')'}"></div>
//                     </ng-container>
//                   </div>
//                   <div class="d-flex flex-column align-items-start">
//                     <strong>{{presentation.title || '[Without title]'}}</strong>
//                     <small class="text-muted">{{presentation.description || 'no description' | ellipsis:250}}</small>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <ng-container *ngIf="presentation.stats.filecount; else noPages">
//                   {{presentation.stats.filecount}} / {{presentation.stats.filesize | bytes:0}}
//                 </ng-container>
//               </td>
//               <td>
//                 <div class="d-flex flex-column align-items-start">
//                   <span>{{presentation.dateUpdated|dfnsFormatDistanceToNow}}</span>
//                   <small class="text-muted">{{presentation.dateUpdated | date:'medium'}}</small>
//                 </div>
//               </td>
//               <td class="text-center" style="width:100px">
//                 <a [routerLink]="['/presentations',presentation._id]" class="btn btn-sm btn-primary">Open</a>
//               </td>
//             </tr>
//           </tbody>
//         </table>
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
            link: ['/presentations', item['_id']]
          }
        }
      },
      { label: 'Files', template: 'files', style: { width: '150px' }, val: (item: Presentation) => { return item['stats'] } },
      { label: 'Last Edit', type: 'date', val: (item: Presentation) => { return item.dateUpdated } }
    ]
  }

  constructor(
    private modal: NgbModal,
    private presentationsService: PresentationsService
  ) { }

  async ngOnInit() {
    this.presentations$ = this.presentationsService.getAll$<Presentation>('presentations')
  }
}
