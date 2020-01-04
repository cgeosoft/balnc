import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject, Observable } from 'rxjs'
import { Project } from '../@shared/models/all'
import { ProjectsRepo } from '../@shared/repos/projects.repo'
import { ProjectManageComponent } from '../project/manage/manage.component'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {

  schema: TableSchema = {
    name: 'projects',
    properties: [
      {
        label: 'Name',
        style: { 'min-width': '300px' },
        type: 'link',
        val: (item: Project) => {
          return {
            label: item.name,
            link: ['/projects/projects', item._id]
          }
        }
      }
    ]
  }

  projects$: Observable<Project[]>
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor (
    private projectsService: ProjectsRepo,
    private modal: NgbModal
  ) { }

  ngOnInit () {
    this.projects$ = this.projectsService.all$()
  }

  filter (term) {
    this.term$.next(term)
  }

  create () {
    this.modal.open(ProjectManageComponent)
  }

}
