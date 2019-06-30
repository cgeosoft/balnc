import { Component, NgZone, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Issue, IssueStatus, IssueStatuses, IssueType, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  issues$: Observable<Issue[]>;
  issuesLength = 0;
  pages = [];
  @LocalStorage("project_page") page = 0;
  @LocalStorage("project_pLength") pLength = 10;

  lengths = [5, 10, 25, 50]
  projects: Project[];
  projectId: any;
  project: any;

  issueStatuses = IssueStatuses
  @LocalStorage("project_filters") filters = {
    status: null
  }

  constructor(
    private projectsService: ProjectsService,
    private modal: NgbModal,
    private zone: NgZone,
    private route: ActivatedRoute,
  ) { }

  get pStart() {
    return this.page * this.pLength
  }
  get pEnd() {
    return this.pStart + this.pLength
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['pid']
      this.load()
    })
  }

  getStatus(status: IssueStatus) {
    return IssueStatuses.find(s => s.key === status)
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
    if (this.pages.length && this.issuesLength % this.pLength > 0) this.pages.push(this.pages[this.pages.length - 1] + 1)
  }

  changedFilters() {
    this.filters = this.filters
  }

  private async load() {
    this.project = await this.projectsService.getOne<Project>('projects', this.projectId)
    this.issues$ = this.projectsService
      .getAll$<Issue>('issues', {
        projectId: { $eq: this.projectId },
        type: { $eq: IssueType.issue },
      })
      .pipe(
        tap((issues: Issue[]) => issues.sort((a, b) => a.insertedAt - b.insertedAt)),
        tap((issues: Issue[]) => issues.reverse()),
        tap((issues: Issue[]) => {
          this.issuesLength = issues.length
          this.calcPages()
          this.zone.run(() => { })
        }),
      )
  }
}

@Pipe({ name: 'filterIssues', pure: false })
export class FilterIssuesPipe implements PipeTransform {
  transform(issues: Issue[], filters?: any): Issue[] {
    return issues.filter((i) => i.status === filters.status || filters.status === null)
  }
}