import { Component, OnInit, NgZone } from '@angular/core'
import { RxProjectDocument } from '../../data/project';
import { Observable } from 'rxjs/Observable';
import { RxCollection, RxDocumentBase } from 'rxdb';
import { DatabaseService } from '../../../../_core/database/services/database.service';
import { RxTaskDocument } from '../../data/task';

import { CreateTaskComponent } from '../create-task/create-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-team-projects-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  dbProject: RxCollection<any>
  dbTask: RxCollection<any>

  tasks$: Observable<any[]>
  project$: Observable<any>

  project: RxDocumentBase<RxProjectDocument> & RxProjectDocument;

  constructor(
    private projectsService: ProjectsService,
    private zone: NgZone,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {
    this.tasks$ = this.projectsService.getTasks()
  }

  createTask() {
    this.modal.open(CreateTaskComponent)
  }

  generateDump() {
    this.projectsService.generateDump()
  }

}
