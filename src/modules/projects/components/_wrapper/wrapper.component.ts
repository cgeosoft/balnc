import { Component, OnInit, NgZone } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { RxPEventDoc } from '../../models/pevent'
import { CreateTaskComponent } from '../create-task/create-task.component'
import { ProjectsService } from '../../projects.service'
import { CreateProjectComponent } from '../create-project/create-project.component'

@Component({
  selector: 'projects-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  tasks: RxPEventDoc[] = []
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

  generating = false

  constructor (
    private projectsService: ProjectsService,
    private modal: NgbModal
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

  async createProject () {
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

  async generateDemoData () {
    this.generating = true
    if (confirm('Are you sure?')) {
      await this.projectsService.generateDemoData()
      await this.load()
    }
    this.generating = false
  }

}
