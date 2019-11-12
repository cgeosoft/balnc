import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Issue, PEventType } from '../models/all'
import { PEventsRepo } from './pevents.repo'

@Injectable()
export class IssuesRepo extends Repository<Issue> {

  constructor(
    dbService: RxDBService,
    private peventsService: PEventsRepo
  ) {
    super(dbService)
    this.entity = 'projects.issue'
  }

  async add(data: Partial<Issue>, ts?: number): Promise<Issue> {
    const issue = await super.add(data, ts)
    await this.peventsService.add({
      issueId: issue._id,
      text: 'issue created',
      type: PEventType.activity
    })
    return issue
  }
}
