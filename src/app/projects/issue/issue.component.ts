import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '@balnc/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Issue, IssueStatus, IssueStatuses, Log, LogType, Project } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-issue',
  templateUrl: 'issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  @ViewChild('timeline', { static: false }) private timeline: ElementRef;
  @ViewChild('desc', { static: false }) private desc: ElementRef;
  commentPreview: boolean
  projectId: string
  issueId: string
  comment: string = null

  issue$: Observable<Issue>
  project$: Observable<Project>
  logs$: Observable<Log[]>

  form: FormGroup

  postCommentLoading = false

  editDesc = false

  statuses = IssueStatus
  issueStatusModel = IssueStatuses

  logType = LogType

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private zone: NgZone,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params['pid']
        this.issueId = params['iid']
        this.form = this.formBuilder.group({
          comment: ['', [Validators.required]]
        })
        this.setup()
      })
  }

  status(status: IssueStatus) {
    const s = this.issueStatusModel.find(x => x.key === status)
    return {
      style: {
        backgroundColor: s.color,
        color: "#FFF"
      },
      label: s.alias
    }
  }

  async nextStatus(currentStatus: IssueStatus) {
    const i = this.issueStatusModel.findIndex(x => x.key === currentStatus)
    if (i === -1 || i === this.issueStatusModel.length - 1) return
    const next = this.issueStatusModel[i + 1].key
    await this.updateStatus(next)
  }

  async updateTitle(title) {
    const issue = await this.projectsService.getOne<Issue>("issues", this.issueId);
    const _title = title.trim()
    if (issue.title === _title) return
    await issue.update({ $set: { title: _title } });
  }

  async updateStatus(status: IssueStatus) {
    const issue = await this.projectsService.getOne<Issue>("issues", this.issueId);
    await issue.update({ $set: { status: status } });
    await this.log(`status updated to ${status}`);
  }

  async updateDesc(description) {
    this.editDesc = false
    const issue = await this.projectsService.getOne<Issue>("issues", this.issueId);
    const _description = description.trim()
    if (issue.description === _description) return
    await issue.update({
      $set: {
        description: _description
      }
    });
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

  enableEditDesc() {
    this.editDesc = true
    setTimeout(() => {
      this.desc.nativeElement.focus()
    })
  }

  private async setup() {
    this.issue$ = this.projectsService.getOne$<Issue>('issues', this.issueId)
    this.logs$ = this.projectsService
      .getAll$<Log>('logs', {
        issueId: { $eq: this.issueId }
      })
      .pipe(
        tap((logs: Log[]) => logs.sort((a, b) => a.insertedAt - b.insertedAt)),
        tap((logs: Log[]) => {
          this.zone.run(() => { })
          this.scroll()
        })
      )

    this.issue$.subscribe((issue) => {
      this.project$ = this.projectsService.getOne$<Project>('projects', issue.projectId)
    })
  }

  private log(message: string) {
    return this.projectsService.addOne<Log>("logs", {
      issueId: this.issueId,
      type: LogType.activity,
      text: message,
      insertedAt: Date.now(),
      insertedFrom: this.config.username
    })
  }

  private scroll(): void {
    setTimeout(() => {
      this.timeline.nativeElement.scrollTop = this.timeline.nativeElement.scrollHeight
    }, 100)
  }

}
