import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ConfigService } from '@balnc/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Issue, IssueType } from '../_shared/models/all'
import { ProjectsRepo } from '../_shared/repos/projects.repo'

@Component({
  selector: 'app-projects-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.scss']
})
export class IssueCreateComponent implements OnInit {

  @Input() projectId
  form: FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsRepo,
    private config: ConfigService
  ) { }

  get modal() {
    return this.activeModal
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      project: [this.projectId, [Validators.required]],
      description: ['', []]
    })
  }

  async onSubmit() {
    const formModel = this.form.value
    const issue: Issue = {
      title: formModel.title,
      description: formModel.description,
      project: this.projectId,
      insertedFrom: this.config.username,
      insertedAt: Date.now(),
      type: IssueType.issue
    }
    const issueId = await this.projectsService.createIssue(issue)
    this.activeModal.close(issueId)
  }
}
