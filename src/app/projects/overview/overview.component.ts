import { Component, NgZone, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Log, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  logs$: Observable<Log[]>;
  projects: Project[];

  constructor(
    private projectsService: ProjectsService,
    private modal: NgbModal,
    private zone: NgZone
  ) { }

  async ngOnInit() {
    this.projects = await this.projectsService.getAll<Project>("projects")
    this.logs$ = this.projectsService.getAll$<Log>('logs').pipe(
      tap((logs: Log[]) => logs.sort((a, b) => a.insertedAt - b.insertedAt)),
      tap((logs: Log[]) => logs.reverse()),
      tap(() => {
        this.zone.run(() => { })
      }),
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
    return this.projects.find(p => p["_id"] === projectId)
  }

}
