import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { RxLogDoc } from '../../models/log'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'projects-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  tasks: RxLogDoc[] = []

  constructor (
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  ngOnInit () {
    this.refreshTasks()
  }

  createTask () {
    this.modal.open(CreateTaskComponent)
  }

  generateDump () {
    this.projectsService.generateDump()
  }

  async refreshTasks () {
    this.tasks = await this.projectsService.getTasks()
  }

}
