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

  async getOverviewProjects () {
    return super.getAll<Project>('projects', {
      isArchived: false,
      isStarred: true
    })
  }

  async getProjects (params?: any) {
    return super.getAll<Project>('projects', {})

    // const tasks = await this.getLatestTasks()
    // const stats = {
    //   tasksCounter: {},
    //   latestTask: {}
    // }

    // tasks.forEach((task) => {
    //   if (!stats.tasksCounter[task.project]) { stats.tasksCounter[task.project] = 0 }
    //   stats.tasksCounter[task.project]++

    //   if (!stats.latestTask[task.project]) { stats.latestTask[task.project] = task }
    //   if (stats.latestTask[task.project].insertedAt > task.insertedAt) {
    //     stats.latestTask[task.project] = task
    //   }
    // })

    // return projects
    // .map(project => {
    //   const p: any = project
    //   p.stats = {
    //     tasksCounter: stats.tasksCounter[p._id] || 0,
    //     latestTask: stats.latestTask[p._id] || {}
    //   }
    //   return p
    // })
    // .sort((a, b) => {
    //   return b.isStarred - a.isStarred
    // })
  }

  async getProject (projectId: any) {
    return super.getOne<Project>('projects', projectId)
  }

  async createProject (name: string) {
    const project = {
      name,
      description: '',
      isArchived: false,
      isStarred: false,
      tags: []
    }
    const result = await super.addOne('projects', project)
    return result
  }

  async getTasks (projectId: string) {
    return super.getAll<PEvent>('pevents', {
      project: { $eq: projectId },
      type: { $eq: 'TASK' }
    })
  }

  async getLatestPEvents () {
    return this.db['pevents']
      .find()
      .sort({ insertedAt: 'desc' })
      .limit(50)
      .exec()
  }

  async getEvent (taskId: string): Promise<RxPEventDoc> {
    return super.getOne<PEvent>('pevents', taskId)
  }

  async getEventsOfParent (taskId: string): Promise<PEvent[]> {
    const events = await this.db['pevents'].find({ parent: { $eq: taskId } }).exec()
    return events
  }

  async createTask (task: PEvent) {
    const d = {
      insertedAt: Date.now(),
      insertedFrom: 'anon',
      type: 'TASK',
      status: 'PENDING'
    }
    const log = { ...task, ...d }
    console.log('adding task', log)
    await super.addOne('pevents', log)
  }

  async createComment (text: string, task: PEvent) {
    const log = {
      description: text,
      insertedAt: Date.now(),
      insertedFrom: 'anon',
      type: 'COMMENT',
      project: task.project,
      parent: task['_id']
    }
    await super.addOne('pevents', log)
  }

  async changeStatus (status: string, task: PEvent) {
    const log = {
      description: status,
      insertedAt: Date.now(),
      insertedFrom: 'anon',
      type: 'CHANGE_STATUS',
      project: task.project,
      parent: task['_id']
    }
    await super.addOne('pevents', log)

    const currentTask = await super.getOne<RxPEventDoc>('pevents', task['_id'])
    await currentTask.update({
      $set: {
        status: status
      }
    })

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
        const task: PEvent = {
          title: `Task ${k}`,
          description: 'lorem ipsum dolor',
          project: projects[pr].get('_id')
        }
        await this.createTask(task)
      }
    }
  }
}
