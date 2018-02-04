import { Component, OnInit, NgZone } from '@angular/core'
import { RxProjectDocument } from '../../data/project';
import { Observable } from 'rxjs/Observable';
import { RxCollection, RxDocumentBase } from 'rxdb';
import { DatabaseService } from '../../../../_core/database/services/database.service';
import { RxTaskDocument } from '../../data/task';

@Component({
  selector: 'app-team-projects-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
      .take(3)

    // this.project$ = this.dbProject.findOne(projectId).$
    // this.project$.subscribe((project: RxDocumentBase<RxProjectDocument> & RxProjectDocument) => {
    //   this.project = project

    //   this.tasks$.subscribe(() => {
    //     this.zone.run(() => { })
    //   })
    // })
  }
}
