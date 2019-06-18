import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RxDocumentBase } from 'rxdb';
import { Observable } from 'rxjs';
import { Issue, IssueType, RxProjectDoc } from '../_shared/models/project';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-issue-create',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  projects$: Observable<(RxDocumentBase<RxProjectDoc> & RxProjectDoc)[]>

  @Input() projectId

  form: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

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
      projectId: this.projectId,
      insertedFrom: "_system",
      insertedAt: Date.now(),
      type: IssueType.Issue
    }
    await this.projectsService.createIssue(issue)
    this.activeModal.close()
  }
}
