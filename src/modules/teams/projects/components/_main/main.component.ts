import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { RxCollection, RxDocumentBase } from 'rxdb';

import { DatabaseService } from '@blnc/core/database/services/database.service';

import { RxProjectDocument } from '../../data/project';
import { RxTaskDocument } from '../../data/task';
import { CreateTaskComponent } from '../create-task/create-task.component';
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


  project: RxDocumentBase<RxProjectDocument> & RxProjectDocument;

  constructor(
    private projectsService: ProjectsService,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {
    this.tasks$ = this.projectsService.tasks.find().$
  }

  createTask() {
    this.modal.open(CreateTaskComponent)
  }

  generateDump() {
    this.projectsService.generateDump()
  }

}
