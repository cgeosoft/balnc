import { Injectable, NgZone } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import * as faker from 'faker'
import { Observable } from 'rxjs'
import { ProjectsEntities } from './models/entities'
import { Issue, IssueType, Log, LogType, Project, RxIssueDoc, RxLogDoc, RxProjectDoc } from './models/project'

@Injectable()
export class ProjectsService extends CommonService {

  projects$: Observable<RxProjectDoc[]>
  issues$: Observable<RxIssueDoc[]>
  logs$: Observable<RxLogDoc[]>

  constructor(
    zone: NgZone,
    dbService: RxDBService,
    private config: ConfigService
  ) {
    super(zone, dbService)
  }

  async setup() {
    await super.setup({
      alias: 'projects',
      entities: ProjectsEntities
    })
    this.projects$ = this.db['projects'].find().$
  }

  async createProject(name: string) {
    const project: Project = {
      name
    }
    const projectDoc = await super.addOne('projects', project)
    return projectDoc['_id']
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
      insertedFrom: this.config.username,
      type: 'TASK',
      status: 'PENDING'
    }
    const log = { ...issue, ...d }
    const issueDoc = await super.addOne('issues', log)
    return issueDoc['_id']
  }

  async createComment(text: string, issueId: string) {
    const log: Log = {
      text,
      insertedAt: Date.now(),
      insertedFrom: this.config.username,
      type: LogType.comment,
      issueId: issueId
    }
    await super.addOne('logs', log)
  }

  async changeStatus(status: string, issueId: string) {
    const log: Log = {
      text: status,
      insertedAt: Date.now(),
      insertedFrom: this.config.username,
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

  async generateDemoData(size = 10) {
    console.log(`generate ${size} projects`)
    for (let i = 0; i < size; i++) {
      const projectData: Project = {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        isArchived: Math.random() > .6,
        isStarred: Math.random() > .3,
        tags: ['lorem', 'ispun'],
        features: {}
      }
      let project = await super.addOne('projects', projectData)
      console.log(`add project ${i}:${project.get('_id')}`)

      console.log(`generate ${size * 5} issues for ${project.get('_id')}`)
      for (let k = 0; k < size * 5; k++) {
        const issueData: Issue = {
          title: faker.hacker.phrase(),
          description: faker.lorem.paragraphs(),
          type: IssueType[IssueType[Math.floor(Math.random() * Object.keys(IssueType).length / 2)]],
          projectId: project.get('_id'),
          insertedAt: Date.now(),
          insertedFrom: this.config.username
        }
        const issue = await this.createIssue(issueData)
        console.log(`add issue ${k}:${issue.get('_id')} to project ${project.get('_id')}`)
      }
    }
  }
}
