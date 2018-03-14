import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'
import { RxCollection, RxDocumentBase } from 'rxdb'

import { DatabaseService } from '@blnc/core/database/services/database.service'

import { RxProjectDocument } from '../../data/project'
import { RxTaskDocument } from '../../data/task'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-team-projects-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tasks: RxTaskDocument[] = []

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
