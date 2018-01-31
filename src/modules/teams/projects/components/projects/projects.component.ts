import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb';
import { RxProjectDocument } from '../../data/project';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from '../../../../_core/database/database.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import * as _ from 'lodash'
import * as moment from 'moment'

@Component({
  selector: 'app-team-projects',
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
    setTimeout(() => {
      this.zone.run(() => { })
    }, 500)
  }

  async setup() {
    this.db = await this.dbService.get<RxProjectDocument>("project")

    console.log("projects loading", this.projects$)

    this.projects$ = this.db.find().$.map((data) => {
      if (!data) { return data }
      data.sort((a, b) => {
        return a.name < b.name ? -1 : 1
      })
      return data
    })
    this.projects$.subscribe((projects) => {

      console.log("projects loaded", projects.length)
      if (projects.length === 0) {
        this.zone.run(() => { })
        return
      }
      for (const project of projects) {
        const _id = project.get("_id")
      }
      this.zone.run(() => { })
    })
  }

  create() {
    const modalRef = this.modal.open(CreateComponent)
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

  getVersion(project: RxDocumentBase<RxProjectDocument> & RxProjectDocument) {
    return project.get("_rev").split("-")[0]
  }

}
