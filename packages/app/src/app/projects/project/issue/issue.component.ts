import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Issue, IssueStatus, IssueStatuses, PEvent, PEventType } from '../../@shared/models/all'
import { IssuesRepo } from '../../@shared/repos/issues.repo'
import { PEventsRepo } from '../../@shared/repos/pevents.repo'

@Component({
  selector: 'app-projects-issue',
  templateUrl: 'issue.component.html',
  styleUrls: ['./issue.component.scss']

})
export class IssueComponent implements OnInit {

  @ViewChild('timeline', { static: false }) timeline: ElementRef
  @ViewChild('desc', { static: false }) desc: ElementRef

  commentPreview: boolean
  issueId: string
  comment: string = null

  issue$: Observable<Issue>
  logs$: Observable<PEvent[]>

  form: FormGroup

  postCommentLoading = false

  editDesc = false

  statuses = IssueStatus
  issueStatuses = IssueStatuses

  logType = PEventType

  ContentBreadcrumbComponent
  breadcrumb

  constructor (
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private peventsRepo: PEventsRepo,
    private issuesRepo: IssuesRepo,
    private config: ConfigService
  ) { }

  ngOnInit () {
    this.route.params.subscribe((params) => {
      this.issueId = params['iid']
      this.form = this.formBuilder.group({
        comment: ['', [Validators.required]]
      })
      this.issue$ = this.issuesRepo.one$(this.issueId)
      this.logs$ = this.peventsRepo.all$().pipe(
        map(i => i.filter(x => x.issueId === this.issueId)),
        tap((logs: PEvent[]) => logs.sort((a, b) => a._timestamp - b._timestamp)),
        tap((logs: PEvent[]) => {
          this.scroll()
        })
      )
    })
  }

  status (status: IssueStatus) {
    return this.issueStatuses.find(x => x.key === status)
  }

  async nextStatus (currentStatus: IssueStatus) {
    const i = this.issueStatuses.findIndex(x => x.key === currentStatus)
    if (i === -1 || i === this.issueStatuses.length - 1) return
    const next = this.issueStatuses[i + 1].key
    await this.updateStatus(next)
  }

  async updateTitle (title) {
    await this.issuesRepo.update(this.issueId, { title: title.trim() })
  }

  async updateStatus (status: IssueStatus) {
    await this.issuesRepo.update(this.issueId, { status: status })
    await this.log(`status updated to ${status}`)
  }

  async updateDesc (description) {
    await this.issuesRepo.update(this.issueId, { description: description.trim() })
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

  enableEditDesc () {
    this.editDesc = true
    setTimeout(() => {
      this.desc.nativeElement.focus()
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
