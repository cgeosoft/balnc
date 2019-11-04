import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Issue } from '../models/all'

@Injectable()
export class IssuesRepo extends Repository<Issue> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'projects.issue'
  }
}
