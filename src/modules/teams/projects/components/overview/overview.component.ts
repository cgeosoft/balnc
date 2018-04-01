import { Component, OnInit, NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'

import { RxProjectDocument } from '@blnc/teams/projects/data/project'
import { RxLogDocument } from '@blnc/teams/projects/data/log'
import { ProjectsService } from '@blnc/teams/projects/services/projects.service';

@Component({
  selector: 'app-team-projects-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  tasks: RxLogDocument[] = []

  constructor(
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {
    const tasks = await this.projectsService.getTasks()
    this.tasks = tasks.sort((a, b) => {
      return a.updatedAt > b.updatedAt ? -1 : 1
    })
  }
}
