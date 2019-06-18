import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Issue, Log, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-task',
  templateUrl: 'task.component.html',
  styleUrls: ['./task.component.scss']
})
export class IssueComponent implements OnInit {

  commentPreview: boolean
  projectId: string
  issueId: string
  comment: string = null

  issue$: Observable<Issue>
  project$: Observable<Project>
  logs$: Observable<Log[]>

  form: FormGroup

  postCommentLoading = false

  constructor(
    private route: ActivatedRoute,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params['pid']
        this.issueId = params['tid']
        this.form = this.formBuilder.group({
          comment: ['', [Validators.required]]
        })
        this.setup()
      })
  }

  private async setup() {
    this.issue$ = this.projectsService.getOne$<Issue>('issues', this.issueId)
    this.logs$ = this.projectsService
      .getAll$<Log>('projects', {
        taskId: { $eq: this.issueId }
      })
      .pipe(
        tap((events) => {
          events = events.sort((a, b) => {
            return a.insertedAt < b.insertedAt ? -1 : 1
          })
        }))

    this.issue$.subscribe((issue) => {
      this.project$ = this.projectsService.getOne$<Project>('projects', issue.projectId)
    })
  }

  async submitComment() {
    const formModel = this.form.value
    if (!formModel.comment) return
    this.postCommentLoading = true
    await this.projectsService.createComment(formModel.comment, this.issueId)
    this.form.reset()
    this.postCommentLoading = false
  }

  async changeStatus(status: string) {
    await this.projectsService.changeStatus(status, this.issueId)
  }
}
