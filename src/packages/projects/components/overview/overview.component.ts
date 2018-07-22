import { Component, OnInit } from '@angular/core'
import { RxLogDoc } from '../../models/log'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'projects-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  tasks: RxLogDoc[] = []

  constructor (
    private projectsService: ProjectsService
  ) { }

  ngOnInit () {
    this.setup()
  }

  private async setup () {
    const tasks = await this.projectsService.getTasks()
    this.tasks = tasks.sort((a, b) => {
      return a.updatedAt > b.updatedAt ? -1 : 1
    })
  }
}
