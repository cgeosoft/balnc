import { Component, NgZone, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { Issue, IssueStatus, IssueStatusModel, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  issues$: Observable<Issue[]>;
  issuesLength = 0;
  pages = [];
  page = 0;
  pLength = 10;

  lengths = [5, 10, 25, 50]
  projects: Project[];

  constructor(
    private projectsService: ProjectsService,
    private modal: NgbModal,
    private zone: NgZone
  ) { }

  get pStart() {
    return this.page * this.pLength
  }
  get pEnd() {
    return this.pStart + this.pLength
  }

  async ngOnInit() {
    this.projects = await this.projectsService.getAll<Project>("projects")
    this.issues$ = this.projectsService.db['issues']
      .find().$.pipe(
        tap((issues: Issue[]) => issues.sort((a, b) => a.insertedAt - b.insertedAt)),
        tap((issues: Issue[]) => issues.reverse()),
        tap((issues: Issue[]) => {
          this.issuesLength = issues.length
          this.calcPages()
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

  getStatus(status: IssueStatus) {
    return IssueStatusModel.find(s => s.key === status)
  }

  getProject(projectId) {
    return this.projects.find(p => p["_id"] === projectId)
  }

  goPrevious() {
    if (this.page > 0) this.page--
  }

  goNext() {
    if (this.page < this.pages.length - 1) this.page++
  }

  calcPages() {
    this.pages = Array.apply(null, { length: this.issuesLength / this.pLength }).map(Number.call, Number)
  }

}
