import { Injectable } from '@angular/core'
import { RxCollection } from 'rxdb'

import * as moment from 'moment'

import { RxProjectDoc } from '../models/project'
import { RxPLogDoc } from '../models/plog'
import { PouchDBService } from '@balnc/common'

@Injectable()
export class ProjectsService {

  logs: RxCollection<RxPLogDoc>
  projects: RxCollection<RxProjectDoc>

  constructor (
    private dbService: PouchDBService
  ) {
    this.setup()
  }

  async setup () {
    this.projects = await this.dbService.get<RxProjectDoc>('projects')
    this.logs = await this.dbService.get<RxPLogDoc>('plogs')
  }

  async getProjects (params?: any) {
    const projects = await this.projects.find(params).exec()

    console.log(projects)
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

  async getProject (projectId): Promise<RxProjectDoc> {
    return this.projects.findOne(projectId).exec()
  }

  async createProject (name: string, description: string) {
    const result = await this.projects
      .newDocument({
        name: name,
        description: description
      })
      .save()
    return result
  }

  async getTasks (params: any = {}) {
    Object.assign(params, { query: { type: { $eq: 'TASK' } } })
    const tasks = await this.logs.find(params.query).exec()
    return tasks
  }

  async getLog (taskId): Promise<RxPLogDoc> {
    return this.logs.findOne(taskId).exec()
  }

  async getLogs (taskId): Promise<RxPLogDoc[]> {
    const logs = await this.logs.find({ parent: { $eq: taskId } }).exec()
    return logs
  }

  async addTask (title: string, projectId: string, description: string) {
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

    const result = this.logs.newDocument(log).save()
    return result
  }

  async addComment (text: string, task: RxPLogDoc) {
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

    const result = this.logs.newDocument(log).save()
    return result
  }

  async generateDump () {
    // await this.projects.remove()
    // await this.tasks.remove()

    const projects: RxProjectDoc[] = []
    for (let i = 0; i < 10; i++) {
      const project = await this.projects.insert({
        name: `Project ${i}`,
        description: 'lorem ipsum dolor',
        isArchived: Math.random() > .6,
        isStarred: Math.random() > .3,
        tags: ['lorem', 'ispun']
      } as RxProjectDoc)
      projects.push(project)
    }

    for (let k = 0; k < 50; k++) {
      const pr = Math.floor(Math.random() * 9)
      await this.addTask(`Task ${k}`, projects[pr].get('_id'), 'lorem ipsum dolor')
    }
  }
}
