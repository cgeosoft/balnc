import { Component, OnInit, NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import { RxCollection, RxDocumentBase } from 'rxdb';

import { DatabaseService } from '@blnc/_core/database/services/database.service';

import { RxProjectDocument } from '../../data/project';
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
  ) { }

  ngOnInit() {
    this.setup()
  }


  private async setup() {
    this.dbProject = await this.dbService.get<RxProjectDocument>("project")
    this.dbTask = await this.dbService.get<RxTaskDocument>("task")

    this.tasks$ = this.dbTask
      .find().$
      .map((data) => {
        if (!data) { return data }
        data.sort((a, b) => {
          return a.updatedAt > b.updatedAt ? -1 : 1
        })
        return data
      })
  }
}
