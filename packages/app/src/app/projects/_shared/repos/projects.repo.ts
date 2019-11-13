import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Project } from '../models/all'

@Injectable()
export class ProjectsRepo extends Repository<Project> {
  constructor (
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'projects.project'
  }
}
