import { Injectable } from '@angular/core';
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
    dbService: RxDBService
  ) {
    super({
      alias: 'projects',
      entities: ProjectsEntities,
      dbService: dbService
    })
  }

  async setup() {
    await super.setup()
    this.projects$ = this.db['projects'].find().$
  }

  async getOverviewProjects() {
    return super.getAll<Project>('projects', {
      isArchived: false,
      isStarred: true
    })
  }

  async createProject(name: string) {
    const project: Project = {
      name
    }
    return super.addOne('projects', project)
  }

  async getLatestIssues() {
    return this.db['issues']
      .find()
      .sort({ insertedAt: 'desc' })
      .limit(50)
      .exec()
  }

  async getIssue(id: string): Promise<RxIssueDoc> {
    return super.getOne<Issue>('issues', id)
  }

  async getEventsOfParent(taskId: string): Promise<Issue[]> {
    const events = await this.db['issues'].find({ parent: { $eq: taskId } }).exec()
    return events
  }

  async createTask(task: Issue) {
    const d = {
      insertedAt: Date.now(),
      insertedFrom: '_system',
      type: 'TASK',
      status: 'PENDING'
    }
    const log = { ...task, ...d }
    console.log('adding task', log)
    await super.addOne('issues', log)
  }

  async createComment(text: string, issueId: string) {
    const log: Log = {
      text,
      insertedAt: Date.now(),
      insertedFrom: '_system',
      type: LogType.Comment,
      taskId: issueId,
    }
    await super.addOne('issues', log)
  }

  async changeStatus(status: string, issueId: string) {
    const log: Log = {
      text: status,
      insertedAt: Date.now(),
      insertedFrom: '_system',
      type: LogType.Activity,
      taskId: issueId
    }
    await super.addOne('issues', log)

    const currentTask = await super.getOne<RxIssueDoc>('issues', issueId)
    await currentTask.update({
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
          title: `Task ${k}`,
          description: 'lorem ipsum dolor',
          type: IssueType[IssueType[Math.floor(Math.random() * Object.keys(IssueType).length / 2)]],
          projectId: projects[pr].get('_id'),
          insertedAt: Date.now(),
          insertedFrom: "_system"
        }
        await this.createTask(issue)
      }
    }
  }
}
