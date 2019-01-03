import { Injectable } from '@angular/core'
import { CommonService } from '@balnc/common'
import { Observable } from 'rxjs'

import { ProjectsEntities } from './models/entities'
import { PEvent, RxPEventDoc } from './models/pevent'
import { Project, RxProjectDoc } from './models/project'

@Injectable()
export class ProjectsService extends CommonService {

  alias = 'projects'
  entities = ProjectsEntities

  public projects$: Observable<RxProjectDoc[]>
  public events$: Observable<RxPEventDoc[]>

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

  async getProject (projectId: any) {
    return super.getOne<Project>('projects', projectId)
  }

  async createProject (name: string, description: string) {
    const result = await super.addOne('project', {
      name: name,
      description: description
    })
    return result
  }

  async getTasks (params: any = {}) {
    Object.assign(params, { query: { type: { $eq: 'TASK' } } })
    const tasks = await super.getAll<PEvent>('pevents', params.query)
    return tasks
  }

  async getEvent (taskId: string): Promise<RxPEventDoc> {
    return super.getOne<PEvent>('pevents', taskId)
  }

  async getEventsOfParent (taskId: string): Promise<PEvent[]> {
    const events = await this.db['pevents'].find({ parent: { $eq: taskId } }).exec()
    return events
  }

  async createTask (title: string, projectId: string, description: string) {
    const log = {
      title: title,
      description: description,
      insertedAt: Date.now(),
      updatedAt: Date.now(),
      insertedFrom: 'anon',
      type: 'TASK',
      status: 'PENDING',
      project: projectId
    }

    return super.addOne('pevents', log)
  }

  async createComment (text: string, task: RxPEventDoc) {
    const log = {
      description: text,
      insertedAt: Date.now(),
      insertedFrom: 'anon',
      type: 'COMMENT',
      project: task.project,
      parent: task.get('_id')
    }

    return super.addOne('pevents', log)
  }

  async generateDemoData () {
    const projects = []
    for (let i = 0; i < 10; i++) {
      const project = {
        name: `Project ${i}`,
        description: 'lorem ipsum dolor',
        isArchived: Math.random() > .6,
        isStarred: Math.random() > .3,
        tags: ['lorem', 'ispun']
      }
      let p = await super.addOne('projects', project)
      projects.push(p)
    }

    for (let k = 0; k < 50; k++) {
      const pr = Math.floor(Math.random() * projects.length)
      if (projects[pr]) {

        await this.createTask(`Task ${k}`, projects[pr].get('_id'), 'lorem ipsum dolor')
      }
    }
  }
}
