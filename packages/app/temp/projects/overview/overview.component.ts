import { Component, NgZone, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CreateProjectComponent } from '../create-project/create-project.component'
import { PEvent, Project } from '../_shared/models/all'
import { ProjectsRepo } from '../_shared/repos/projects.repo'

@Component({
  selector: 'app-projects-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss'],
  host: { 'class': 'page' }
})
export class OverviewComponent implements OnInit {

  logs$: Observable<PEvent[]>
  projects: Project[]

  constructor(
    private projectsService: ProjectsRepo,
    private modal: NgbModal,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.projects = await this.projectsService.getAll<Project>('projects')
    this.logs$ = this.projectsService.getAll$<PEvent>('logs').pipe(
      tap((logs: PEvent[]) => logs.sort((a, b) => a.insertedAt - b.insertedAt)),
      tap((logs: PEvent[]) => logs.reverse()),
      tap(() => {
        this.zone.run(() => { })
      })
    )
  }

  async createProject() {
    await this.modal.open(CreateProjectComponent).result
    await this.ngOnInit()
  }

  async generate() {
    this.projectsService.generateDemoData()
  }

  getProject(projectId) {
    return this.projects.find(p => p['_id'] === projectId)
  }

}
