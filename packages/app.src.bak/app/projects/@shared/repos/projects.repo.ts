import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Project } from '../models/all'

@Injectable({
  providedIn:'root'
})
export class ProjectsRepo extends Repository<Project> {
  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'projects.project'
  }
}
