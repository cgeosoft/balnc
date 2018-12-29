import { Injectable } from '@angular/core'
import { CommonService, RxDBService } from '@balnc/common'
import * as moment from 'moment'
import { Observable } from 'rxjs'

import { ProjectsEntities } from './models/entities'
import { PEvent, RxPEventDoc } from './models/pevent'
import { RxProjectDoc, Project } from './models/project'

@Injectable()
export class ProjectsService extends CommonService {

  public projects$: Observable<RxProjectDoc[]>
  public events$: Observable<RxPEventDoc[]>

  constructor (
    dbService: RxDBService
  ) {
    super(dbService)
    super.setup('projects', ProjectsEntities)
  }

  async resolve () {
    await super.resolve()
    // this.db['projects'].find().$.subscribe(projects => {
    //   projects
    //     // .sort((ca, cb) => {
    //     //   const caLastUpdate = new Date(ca.logs[ca.logs.length - 1].date)
    //     //   const cbLastUpdate = new Date(cb.logs[cb.logs.length - 1].date)
    //     //   return cbLastUpdate.getTime() - caLastUpdate.getTime()
    //     // })
    // })
  }

  async getProjects (params?: any) {
    const projects = await super.getAll('projects', params)

    const tasks = await this.getTasks()
    const stats = {
      tasksCounter: {},
      latestTask: {}
    }

    tasks.forEach((task) => {
      if (!stats.tasksCounter[task.project]) { stats.tasksCounter[task.project] = 0 }
      stats.tasksCounter[task.project]++

      if (!stats.latestTask[task.project]) { stats.latestTask[task.project] = task }
      if (stats.latestTask[task.project].insertedAt > task.insertedAt) {
        stats.latestTask[task.project] = task
      }
    })

    return projects
      .map(project => {
        const p: any = project
        p.stats = {
          tasksCounter: stats.tasksCounter[p._id] || 0,
          latestTask: stats.latestTask[p._id] || {}
        }
        return p
      })
      .sort((a, b) => {
        return b.isStarred - a.isStarred
      })
  }

  async getProject (projectId: any): Promise<Project> {
    return super.getOne('projects', projectId)
  }

  async createProject (name: string, description: string) {
    const result = await super.addOne('project', {
      name: name,
      description: description
    })
    return result
  }

  async getTasks (params: any = {}): Promise<PEvent[]> {
    Object.assign(params, { query: { type: { $eq: 'TASK' } } })
    const tasks = await super.getAll<PEvent>('events', params.query)
    return tasks
  }

  async getEvent (taskId: string): Promise<PEvent> {
    return super.getOne('events', taskId)
  }

  async getEventsOfParent (taskId: string): Promise<PEvent[]> {
    const events = await this.db['events'].find({ parent: { $eq: taskId } }).exec()
    return events
  }

  async createTask (title: string, projectId: string, description: string) {
    const now = moment().toISOString()
    const user = 'anonymous'

    const log = {
      title: title,
      description: description,
      insertedAt: now,
      updatedAt: now,
      insertedFrom: user,
      type: 'TASK',
      status: 'PENDING',
      project: projectId
    }

    return super.addOne('events', log)
  }

  async createComment (text: string, task: RxPEventDoc) {
    const now = moment().toISOString()
    const user = 'anonymous'

    const log = {
      description: text,
      insertedAt: now,
      insertedFrom: user,
      type: 'COMMENT',
      project: task.project,
      parent: task.get('_id')
    }

    return super.addOne('events', log)
  }

  async generateDump () {
    const projects: RxProjectDoc[] = []
    for (let i = 0; i < 10; i++) {
      const project = {
        name: `Project ${i}`,
        description: 'lorem ipsum dolor',
        isArchived: Math.random() > .6,
        isStarred: Math.random() > .3,
        tags: ['lorem', 'ispun']
      }
      await super.addOne('projects', project)
    }

    for (let k = 0; k < 50; k++) {
      const pr = Math.floor(Math.random() * 9)
      await this.createTask(`Task ${k}`, projects[pr].get('_id'), 'lorem ipsum dolor')
    }
  }
}
