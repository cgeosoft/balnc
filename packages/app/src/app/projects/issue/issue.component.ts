import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Issue, IssueStatus, IssueStatuses, PEvent, PEventType, Project } from '../@shared/models/all'
import { IssuesRepo } from '../@shared/repos/issues.repo'
import { PEventsRepo } from '../@shared/repos/pevents.repo'
import { ProjectsRepo } from '../@shared/repos/projects.repo'

@Component({
  selector: 'app-projects-issue',
  templateUrl: 'issue.component.html',
  styleUrls: ['./issue.component.scss'],
  host: { 'class': 'page' }
})
export class IssueComponent implements OnInit {

  @ViewChild('timeline', { static: false }) timeline: ElementRef
  @ViewChild('desc', { static: false }) desc: ElementRef

  commentPreview: boolean
  projectId: string
  issueId: string
  comment: string = null

  issue$: Observable<Issue>
  project$: Observable<Project>
  logs$: Observable<PEvent[]>

  form: FormGroup

  postCommentLoading = false

  editDesc = false

  statuses = IssueStatus
  issueStatusModel = IssueStatuses

  logType = PEventType

  ContentBreadcrumbComponent
  project: Project
  breadcrumb

  constructor (
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private projectsRepo: ProjectsRepo,
    private peventsRepo: PEventsRepo,
    private issuesRepo: IssuesRepo,
    private zone: NgZone,
    private config: ConfigService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(async (params) => {
        this.projectId = params['pid']
        this.issueId = params['iid']
        this.form = this.formBuilder.group({
          comment: ['', [Validators.required]]
        })
        await this.setup()
      })
  }

  status (status: IssueStatus) {
    const s = this.issueStatusModel.find(x => x.key === status)
    return {
      style: {
        backgroundColor: s.color,
        color: '#FFF'
      },
      label: s.alias
    }
  }

  async nextStatus (currentStatus: IssueStatus) {
    const i = this.issueStatusModel.findIndex(x => x.key === currentStatus)
    if (i === -1 || i === this.issueStatusModel.length - 1) return
    const next = this.issueStatusModel[i + 1].key
    await this.updateStatus(next)
  }

  async updateTitle (title) {
    const issue = await this.issuesRepo.one(this.issueId)
    const _title = title.trim()
    if (issue.title === _title) return
    await this.issuesRepo.update(this.issueId, { $set: { title: _title } })
  }

  async updateStatus (status: IssueStatus) {
    await this.issuesRepo.update(this.issueId, { $set: { status: status } })
    this.log(`status updated to ${status}`)
  }

  async updateDesc (description) {
    this.editDesc = false
    const issue = await this.issuesRepo.one(this.issueId)
    const _description = description.trim()
    if (issue.description === _description) return
    await this.issuesRepo.update(this.issueId, { $set: { description: _description } })
  }

  async submitComment () {
    const formModel = this.form.value
    if (!formModel.comment) return
    this.postCommentLoading = true

    const event: Partial<PEvent> = {
      text: formModel.comment,
      user: this.config.username,
      type: PEventType.comment,
      issueId: this.issueId
    }
    await this.peventsRepo.add(event)

    this.form.reset()
    this.postCommentLoading = false
  }

  async changeStatus (status: string) {
    await this.issuesRepo.update(this.issueId, {
      $set: {
        status: status,
        updated: {
          timestamp: Date.now(),
          user: this.config.username
        }
      }
    })
  }

  enableEditDesc () {
    this.editDesc = true
    setTimeout(() => {
      this.desc.nativeElement.focus()
    })
  }

  private async setup () {
    this.issue$ = this.issuesRepo.one$(this.issueId)
    this.logs$ = this.peventsRepo
      .all$()
      .pipe(
        map(i => i.filter(x => x.issueId === this.issueId)),
        tap((logs: PEvent[]) => logs.sort((a, b) => a._timestamp - b._timestamp)),
        tap((logs: PEvent[]) => {
          this.zone.run(() => { })
          this.scroll()
        })
      )

    this.issue$.subscribe(async (issue) => {
      this.project = await this.projectsRepo.one(issue.project)
      this.breadcrumb = [
        { label: 'Projects' },
        { url: ['/projects/project', issue.project], label: 'Projects' },
        { url: ['/projects/project', issue.project], label: 'Issues' },
        { label: issue.title }
      ]
    })
  }

  private log (message: string) {
    return this.peventsRepo.add({
      issueId: this.issueId,
      type: PEventType.activity,
      text: message,
      user: this.config.username
    })
  }

  private scroll (): void {
    setTimeout(() => {
      this.timeline.nativeElement.scrollTop = this.timeline.nativeElement.scrollHeight
    }, 100)
  }

}
