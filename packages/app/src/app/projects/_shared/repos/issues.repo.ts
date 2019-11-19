import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Issue, PEventType } from '../models/all'
import { PEventsRepo } from './pevents.repo'

@Injectable()
export class IssuesRepo extends Repository<Issue> {

  constructor (
    private peventsService: PEventsRepo,
    injector: Injector
  ) {
    super(injector)
    this.entity = 'projects.issue'
  }

  async add (data: Partial<Issue>, group?: string, ts?: number): Promise<Issue> {
    const issue = await super.add(data, group, ts)
    await this.peventsService.add({
      issueId: issue._id,
      text: 'issue created',
      type: PEventType.activity
    })
    return issue
  }
}
