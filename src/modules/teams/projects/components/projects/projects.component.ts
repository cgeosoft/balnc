import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb';
import { RxProjectDocument } from '../../data/project';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../../../_core/database/services/database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from '../create-project/create-project.component';
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
  selector: 'app-team-projects-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {

  db: RxCollection<RxProjectDocument>
  projects$: Observable<any>
  projectImages: any = {}
  projectFilesize: any = {}

  constructor(
    private dbService: DatabaseService,
    private zone: NgZone,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.setup()
  }

  async setup() {
    this.db = await this.dbService.get<RxProjectDocument>("project")

    this.projects$ = this.db.find().$.map((data) => {
      if (!data) { return data }
      data.sort((a, b) => {
        return a.name < b.name ? -1 : 1
      })
      return data
    })

    this.projects$.subscribe((projects) => {
      this.zone.run(() => { })
    })
  }

  create() {
    const modalRef = this.modal.open(CreateProjectComponent)
    modalRef.result
      .then((result) => {
        const now = moment().toISOString()
        const project = this.db.newDocument({
          name: result.name,
        })
        project.save()
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }
}
