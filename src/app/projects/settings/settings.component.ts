import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CreateProjectComponent } from '../create-project/create-project.component'
import { Project } from '../_shared/models/project'
import { ProjectsService } from '../_shared/projects.service'

@Component({
  selector: 'app-projects-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

  pevents: any[]
  projects$: Observable<Project[]>
  generating: boolean
  generated: number

  constructor (
    private projectsService: ProjectsService,
    private modal: NgbModal
  ) { }

  async ngOnInit () {
    this.projects$ = await this.projectsService
      .getAll$<Project>('projects')
      .pipe(
        tap((projects: Project[]) => projects.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        }
        ))
      )
  }

  async createProject () {
    await this.modal.open(CreateProjectComponent).result
    await this.ngOnInit()
  }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    await this.projectsService.generateDemoData()
    this.generated = Date.now()
  }
}
