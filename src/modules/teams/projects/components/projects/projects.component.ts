import { Component, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CreateProjectComponent } from '../create-project/create-project.component'
import * as _ from 'lodash'
import * as moment from 'moment'
import { ProjectsService } from '../../services/projects.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team-projects-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

  projects$: Observable<any[]>;

  constructor(
    private modal: NgbModal,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.load()
  }

  async load() {
    this.projects$ = this.projectsService.getProjects()
  }

  refresh() {
    this.load()
  }

  async create() {
    await this.modal.open(CreateProjectComponent).result
    this.load()
  }
}
