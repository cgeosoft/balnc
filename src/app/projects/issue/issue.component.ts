import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private zone: NgZone
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

  async nextStatus(status: IssueStatus) {
    const i = this.issueStatusModel.findIndex(x => x.key === status)
    if (i === -1 || i === this.issueStatusModel.length - 1) return
    const issue = await this.projectsService.getOne<Issue>("issues", this.issueId);
    const newstatus = this.issueStatusModel[i + 1].key
    await issue.update({ $set: { status: newstatus } });
    await this.log(`status updated to ${newstatus}`);
  }

  async updateTitle(title) {
    const issue = await this.projectsService.getOne<Issue>("issues", this.issueId);
    const _title = title.trim()
    if (issue.title === _title) return
    await issue.update({ $set: { title: _title } });
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
      insertedFrom: "_system"
    })
  }

  private scroll(): void {
    setTimeout(() => {
      this.timeline.nativeElement.scrollTop = this.timeline.nativeElement.scrollHeight
    }, 100)
  }

}