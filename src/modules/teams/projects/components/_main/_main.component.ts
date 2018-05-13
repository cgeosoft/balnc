import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'

import { RxProject } from '../../data/project'
import { RxLogDocument } from '../../data/log'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-teams-projects-main',
  templateUrl: './_main.component.html',
  styleUrls: ['./_main.component.scss']
})
export class MainComponent implements OnInit {

  tasks: RxLogDocument[] = []

  constructor(
    private projectsService: ProjectsService,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this.refreshTasks()
  }

  createTask() {
    this.modal.open(CreateTaskComponent)
  }

  generateDump() {
    this.projectsService.generateDump()
  }

  async refreshTasks() {
    this.tasks = await this.projectsService.getTasks()
  }

}
