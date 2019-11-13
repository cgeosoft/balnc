import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CreateProjectComponent } from '../create-project/create-project.component'
import { Project } from '../_shared/models/all'
import { ProjectsRepo } from '../_shared/repos/projects.repo'
import { DemoService } from '../_shared/services/demo.service'

@Component({
  selector: 'app-projects-settings',
  templateUrl: 'settings.component.html',
  host: { 'class': 'page' }
})
export class SettingsComponent implements OnInit {

  pevents: any[]
  projects$: Observable<Project[]>
  generating: boolean
  generated: number

  constructor (
    private projectsRepo: ProjectsRepo,
    private projectsService: DemoService,
    private modal: NgbModal
  ) { }

  async ngOnInit () {
    this.projects$ = this.projectsRepo.all$().pipe(
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
    await this.projectsService.generate()
    this.generated = Date.now()
  }
}
