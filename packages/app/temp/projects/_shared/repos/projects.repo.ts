import { Injectable } from '@angular/core'
import { ConfigService, Repository, RxDBService } from '@balnc/core'
import * as faker from 'faker'
import { Observable } from 'rxjs'
import { Issue, IssueType, PEvent, PEventType, Project, RxIssueDoc, RxLogDoc, RxProjectDoc } from '../models/all'
import { ProjectsEntities } from './models/entities'

@Injectable()
export class ProjectsRepo extends Repository<Project> {

  projects$: Observable<RxProjectDoc[]>
  issues$: Observable<RxIssueDoc[]>
  logs$: Observable<RxLogDoc[]>

  constructor(
    dbService: RxDBService,
    private config: ConfigService
  ) {
    super(dbService)
    this.entity = 'project'
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
    const projectDoc = await super.one('projects', project)
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
    const issueDoc = await super.one('issues', log)
    return issueDoc['_id']
  }

  async createComment(text: string, issueId: string) {
    const log: PEvent = {
      text,
      insertedAt: Date.now(),
      insertedFrom: this.config.username,
      type: PEventType.comment,
      issueId: issueId
    }
    await super.one('logs', log)
  }

  async changeStatus(status: string, issueId: string) {
    const log: PEvent = {
      text: status,
      insertedAt: Date.now(),
      insertedFrom: this.config.username,
      type: PEventType.activity,
      issueId: issueId
    }
    await super.one('issues', log)

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
      let project = await super.one('projects', projectData)
      console.log(`add project ${i}:${project.get('_id')}`)

      console.log(`generate ${size * 5} issues for ${project.get('_id')}`)
      for (let k = 0; k < size * 5; k++) {
        const issueData: Issue = {
          title: faker.hacker.phrase(),
          description: faker.lorem.paragraphs(),
          type: IssueType[IssueType[Math.floor(Math.random() * Object.keys(IssueType).length / 2)]],
          project: project.get('_id'),
          insertedAt: Date.now(),
          insertedFrom: this.config.username
        }
        const issue = await this.createIssue(issueData)
        console.log(`add issue ${k}:${issue.get('_id')} to project ${project.get('_id')}`)
      }
    }
  }
}
