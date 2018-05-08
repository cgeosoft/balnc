import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as moment from 'moment'

import { RxProject, ProjectSchema } from "../data/project"
import { RxLogDocument, LogSchema } from "../data/log"
import { Entity } from "@balnc/common/models/entity";
import { DatabaseService } from "@balnc/common/services/database.service";

const entities: Entity[] = [{
    name: 'project',
    schema: ProjectSchema,
    sync: true,
}, {
    name: 'log',
    schema: LogSchema,
    sync: true,
}]

@Injectable()
export class ProjectsService implements Resolve<any> {

    logs: RxCollection<RxLogDocument>
    projects: RxCollection<RxProject>

    constructor(
        private dbService: DatabaseService,
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        await this.setup()
        return true
    }

    async setup() {
        await this.dbService.loadEntities(entities)
        this.projects = await this.dbService.get<RxProject>("project")
        this.logs = await this.dbService.get<RxLogDocument>("log")
    }

    async getProjects(params?: any) {
        const projects = await this.projects.find(params).exec()
        const tasks = await this.getTasks()
        const stats = {
            tasksCounter: {},
            latestTask: {},
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
                    latestTask: stats.latestTask[p._id] || {},
                }
                return p
            })
            .sort((a, b) => {
                return b.isStarred - a.isStarred
            })
    }

    async getProject(projectId): Promise<RxProject> {
        return await this.projects.findOne(projectId).exec()
    }

    async addProject(name: string, description: string) {
        const result = await this.projects
            .newDocument({
                name: name,
                description: description,
            })
            .save()
        return result
    }

    async getTasks(params: any = {}) {
        Object.assign(params, { query: { type: { $eq: "TASK" } } })
        const tasks = await this.logs.find(params.query).exec()
        return tasks
    }

    async getLog(taskId): Promise<RxLogDocument> {
        return await this.logs.findOne(taskId).exec()
    }

    async getLogs(taskId): Promise<RxLogDocument[]> {
        const logs = await this.logs.find({ parent: { $eq: taskId } }).exec()
        return logs
    }

    async addTask(title: string, projectId: string, description: string) {
        const now = moment().toISOString()
        const user = "anonymous"

        const log = {
            title: title,
            description: description,
            insertedAt: now,
            updatedAt: now,
            insertedFrom: user,
            type: "TASK",
            status: "PENDING",
            project: projectId
        }

        const result = this.logs.newDocument(log).save()
        return result
    }

    async addComment(text: string, task: RxLogDocument) {
        const now = moment().toISOString()
        const user = "anonymous"

        const log = {
            description: text,
            insertedAt: now,
            insertedFrom: user,
            type: "COMMENT",
            project: task.project,
            parent: task.get("_id")
        }

        const result = this.logs.newDocument(log).save()
        return result
    }

    async generateDump() {
        // await this.projects.remove()
        // await this.tasks.remove()

        const projects: RxProject[] = [];
        for (let i = 0; i < 10; i++) {
            const project = await this.projects.insert({
                name: `Project ${i}`,
                description: "lorem ipsum dolor",
                isArchived: Math.random() > .6,
                isStarred: Math.random() > .3,
                tags: ["lorem", "ispun"]
            })
            projects.push(project);
        }

        for (let k = 0; k < 50; k++) {
            const pr = Math.floor(Math.random() * 9)
            await this.addTask(`Task ${k}`, projects[pr].get("_id"), "lorem ipsum dolor")
        }
    }
}
