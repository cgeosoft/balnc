import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectsService } from '../_shared/projects.service';

@Component({
  selector: 'app-projects-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  issues: any[] = []
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
    // this.setFilter('Active')
    // this.load()
  }

  async load () {
    // this.projects = await this.projectsService.getProjects(this.filters)
  }

  refresh () {
    this.load()
  }

  async createProject () {
    await this.modal.open(CreateProjectComponent).result
    await this.load()
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
