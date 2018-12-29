import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { RxProjectDoc } from '../../models/project'
import { RxPEventDoc } from '../../models/pevent'
import { ProjectsService } from '../../projects.service'

@Component({
  selector: 'projects-task',
  templateUrl: 'task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  commentPreview: boolean
  projectId: string
  taskId: string
  comment: string = null

  task: RxPEventDoc
  project: RxProjectDoc & any = {}
  logs: RxPEventDoc[] = []

  form: FormGroup

  constructor (
    private route: ActivatedRoute,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private projectsService: ProjectsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(params => {
        this.projectId = params['projectId']
        this.taskId = params['taskId']
        this.form = this.formBuilder.group({
          comment: ['', [Validators.required]]
        })
        this.setup()
        this.getLogs()
      })
  }

  private async setup () {
    this.task = await this.projectsService.getEvent(this.taskId)
    this.project = await this.projectsService.getProject(this.task.project)
  }

  private async getLogs () {
    const logs = await this.projectsService.getEventsOfParent(this.taskId)
    this.logs = logs.sort((a, b) => {
      return a.insertedAt < b.insertedAt ? -1 : 1
    })
  }

  async submitComment () {
    const formModel = this.form.value
    await this.projectsService.createComment(formModel.comment, this.task)
    await this.getLogs()
    this.form.reset()
  }
}
