import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { PEvent, RxPEventDoc } from '../../models/pevent'
import { Project, RxProjectDoc } from '../../models/project'
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

  task: PEvent
  project: Project
  pevents: PEvent[] = []

  form: FormGroup

  postCommentLoading = false

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
        this.projectId = params['pid']
        this.taskId = params['tid']
        this.form = this.formBuilder.group({
          comment: ['', [Validators.required]]
        })
        this.setup()
        this.getPEvents()
      })
  }

  private async setup () {
    this.task = await this.projectsService.getEvent(this.taskId)
    this.project = await this.projectsService.getProject(this.task.project)
  }

  private async getPEvents () {
    const pEvents = await this.projectsService.getEventsOfParent(this.taskId)
    this.pevents = pEvents.sort((a, b) => {
      return a.insertedAt < b.insertedAt ? -1 : 1
    })
  }

  async submitComment () {
    const formModel = this.form.value
    if (!formModel.comment) return
    this.postCommentLoading = true
    // await this.projectsService.createComment(formModel.comment, this.task)
    await this.getPEvents()
    this.form.reset()
    this.postCommentLoading = false
  }
}
