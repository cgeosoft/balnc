import { Component, OnInit, NgZone } from '@angular/core'
import { RxProjectDocument } from '../../data/project';
import { Observable } from 'rxjs/Observable';
import { RxCollection, RxDocumentBase } from 'rxdb';
import { DatabaseService } from '../../../../_core/database/services/database.service';
import { RxTaskDocument } from '../../data/task';

@Component({
  selector: 'app-team-projects-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  dbProject: RxCollection<any>
  dbTask: RxCollection<any>

  tasks$: Observable<any[]>
  project$: Observable<any>

  project: RxDocumentBase<RxProjectDocument> & RxProjectDocument;

  constructor(
    private dbService: DatabaseService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
  }
}
