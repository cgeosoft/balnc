import { Component, NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CreateProjectComponent } from '../create-project/create-project.component'
import * as _ from 'lodash'
import * as moment from 'moment'
import { ProjectsService } from '../../services/projects.service'

@Component({
  selector: 'app-team-projects-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {

  projects$: Observable<any>

  constructor(
    private zone: NgZone,
    private modal: NgbModal,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.setup()
  }

  async setup() {
    this.projects$ = this.projectsService.getProjects()
  }

  create() {
    this.modal.open(CreateProjectComponent)
  }
}
