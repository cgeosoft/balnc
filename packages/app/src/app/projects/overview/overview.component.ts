import { Component, NgZone, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CreateProjectComponent } from '../create-project/create-project.component'
import { PEvent, Project } from '../_shared/models/all'
import { PEventsRepo } from '../_shared/repos/pevents.repo'
import { ProjectsRepo } from '../_shared/repos/projects.repo'
import { ProjectsService } from '../_shared/services/projects.service'

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
    private projectsRepo: ProjectsRepo,
    private peventsRepo: PEventsRepo,
    private projectsService: ProjectsService,
    private modal: NgbModal,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.projects = await this.projectsRepo.all()
    this.logs$ = this.peventsRepo.all$().pipe(
      tap((logs: PEvent[]) => logs.sort((a, b) => a._timestamp - b._timestamp)),
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
    await this.projectsService.generateDemoData()
  }

  getProject(projectId) {
    return this.projects.find(p => p._id === projectId)
  }

}
