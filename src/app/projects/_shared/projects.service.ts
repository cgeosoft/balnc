import { Injectable, NgZone } from '@angular/core';
import { RxDBService } from '@balnc/core';
import { CommonService } from '@balnc/shared';
import { Observable } from 'rxjs';
import { ProjectsEntities } from './models/entities';
import { Issue, IssueType, Log, LogType, Project, RxIssueDoc, RxLogDoc, RxProjectDoc } from './models/project';

@Injectable()
export class ProjectsService extends CommonService {

  projects$: Observable<RxProjectDoc[]>
  issues$: Observable<RxIssueDoc[]>
  logs$: Observable<RxLogDoc[]>

  constructor(
    zone: NgZone,
    dbService: RxDBService,
  ) {
    super(zone, dbService)
  }

  async setup() {
    await super.setup({
      alias: 'projects',
      entities: ProjectsEntities,
    })
    this.projects$ = this.db['projects'].find().$
  }

  async createProject(name: string) {
    const project: Project = {
      name
    }
    return super.addOne('projects', project)
  }

  async getIssue(id: string): Promise<RxIssueDoc> {
    return super.getOne<Issue>('issues', id)
  }

  async getEventsOfParent(issueId: string): Promise<Issue[]> {
    const events = await this.db['issues'].find({ parent: { $eq: issueId } }).exec()
    return events
  }

  async createIssue(issue: Issue) {
    const d = {
      insertedAt: Date.now(),
      insertedFrom: '_system',
      type: 'TASK',
      status: 'PENDING'
    }
    const log = { ...issue, ...d }
    console.log('adding issue', log)
    const issueDoc = await super.addOne('issues', log)
    return issueDoc["_id"]
  }

  async createComment(text: string, issueId: string) {
    const log: Log = {
      text,
      insertedAt: Date.now(),
      insertedFrom: '_system',
      type: LogType.comment,
      issueId: issueId,
    }
    await super.addOne('logs', log)
  }

  async changeStatus(status: string, issueId: string) {
    const log: Log = {
      text: status,
      insertedAt: Date.now(),
      insertedFrom: '_system',
      type: LogType.activity,
      issueId: issueId
    }
    await super.addOne('issues', log)

    const currentIssue = await super.getOne<RxIssueDoc>('issues', issueId)
    await currentIssue.update({
      $set: {
        status: status
      }
    })

  }

  async generateDemoData() {
    const projects: RxProjectDoc[] = []
    for (let i = 0; i < 10; i++) {
      const project: Project = {
        name: `Project ${i}`,
        description: 'lorem ipsum dolor',
        isArchived: Math.random() > .6,
        isStarred: Math.random() > .3,
        tags: ['lorem', 'ispun'],
        features: {}
      }
      let p = await super.addOne('projects', project)
      projects.push(p)
    }

    for (let k = 0; k < 50; k++) {
      const pr = Math.floor(Math.random() * projects.length)
      if (projects[pr]) {
        const issue: Issue = {
          title: `Issue ${k}`,
          description: 'lorem ipsum dolor',
          type: IssueType[IssueType[Math.floor(Math.random() * Object.keys(IssueType).length / 2)]],
          projectId: projects[pr].get('_id'),
          insertedAt: Date.now(),
          insertedFrom: "_system"
        }
        await this.createIssue(issue)
      }
    }
  }
}
