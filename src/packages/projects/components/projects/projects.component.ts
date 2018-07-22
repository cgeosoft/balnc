import { Component, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { ProjectsService } from '../../services/projects.service'
import { CreateProjectComponent } from '../create-project/create-project.component'

@Component({
  selector: 'projects-projects',
  templateUrl: 'projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any[] = null

  typeFilterSelected = null
  typeFilters = [
    { label: 'Starred' },
    { label: 'Active' },
    { label: 'Archived' },
    { label: 'Everything' }
  ]
  filters: any
  showFilters = false

  constructor (
    private modal: NgbModal,
    private projectsService: ProjectsService
  ) { }

  ngOnInit () {
    this.setFilter('Active')
    this.load()
  }

  async load () {
    this.projects = await this.projectsService.getProjects(this.filters)
  }

  refresh () {
    this.load()
  }

  async create () {
    await this.modal.open(CreateProjectComponent).result
    this.load()
  }

  setFilter (filter) {
    this.typeFilterSelected = filter
    switch (filter) {
      case 'Starred':
        this.filters = { isStarred: { $eq: true } }
        break
      case 'Active':
        this.filters = { isArchived: { $eq: false } }
        break
      case 'Archived':
        this.filters = { isArchived: { $eq: true } }
        break
      case 'Everything':
        this.filters = {}
        break
    }
    this.load()
  }
}
