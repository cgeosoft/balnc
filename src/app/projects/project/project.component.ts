import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CreateIssueComponent as CreateIssueComponent } from '../create-issue/create-issue.component';
import { Issue, IssueType, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-project',
  templateUrl: 'project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  tabsMenu: any
  issues$: Observable<Issue[]>
  project: Project
  projectId: string

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit() {

    this.tabsMenu = {
      selected: 'issues',
      tabs: [{
        id: 'issues',
        label: 'Issues',
        icon: 'issues'
      }, {
        id: 'settings',
        icon: 'cog',
        right: true
      }]
    }

    this.route.params.subscribe(params => {
      this.projectId = params['pid']
      this.load()
    })
  }

  async createIssue() {
    const modalRef = this.modal.open(CreateIssueComponent)
    modalRef.componentInstance.projectId = this.projectId
    await modalRef.result
    this.load()
  }

  private async load() {
    this.project = await this.projectsService.getOne<Project>('projects', this.projectId)
    this.issues$ = this.projectsService.getAll$<Issue>('issues', {
      projectId: { $eq: this.projectId },
      type: { $eq: IssueType.issue }
    })
  }
}
