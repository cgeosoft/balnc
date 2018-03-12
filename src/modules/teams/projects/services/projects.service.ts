import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as moment from 'moment'

import { DatabaseService } from "@blnc/core/database/services/database.service"

import { RxProjectDocument, ProjectSchema } from "../data/project"
import { RxTaskDocument, TaskSchema } from "../data/task"
import { Entity } from "@blnc/core/database/models/entity";

const entities: Entity[] = [{
    name: 'project',
    schema: ProjectSchema,
    sync: false,
}, {
    name: 'task',
    schema: TaskSchema,
    sync: false,
}]

@Injectable()
export class ProjectsService implements Resolve<any> {

    tasks: RxCollection<RxTaskDocument>
    projects: RxCollection<RxProjectDocument>

    constructor(
        private dbService: DatabaseService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.setup()
    }

    async setup() {
        await this.dbService.setup(entities)
        this.projects = await this.dbService.get<RxProjectDocument>("project")
        this.tasks = await this.dbService.get<RxTaskDocument>("task")
    }

    async getProjects(params?: any) {
        const projects = await this.projects
            .find(params)
            .exec()

        const tasks = await this.getTasks()

        const tasksTotals = {}

        tasks.forEach((task) => {
            if (!tasksTotals[task.project]) { tasksTotals[task.project] = 0 }
            tasksTotals[task.project]++
        })

        console.log(tasksTotals)

        return projects
            .map(project => {
                const p: any = project
                p._tasksTotal = tasksTotals[p._id] || 0
                return p
            })
            .sort((a, b) => {
                return b.isStarred - a.isStarred
            })
    }

    getProject(projectId) {
        return this.projects.findOne(projectId).$
    }

    addProject(name: string, description: string) {
        const project = this.projects.newDocument({
            name: name,
            description: description,
        })
        return project.save()
    }

    async getTasks(params: any = {}) {
        const tasks = await this.tasks
            .find(params.query)
            .exec()
        return tasks
    }

    getTask(taskId) {
        return this.tasks.findOne(taskId).$
    }

    addTask(title: string, projectId: string, description: string) {
        const now = moment().toISOString()
        const user = "anonymous"

        const taskObj = {
            title: title,
            insertedAt: now,
            updatedAt: now,
            insertedFrom: user,
            log: [{
                comment: "Task Created",
                from: user,
                at: now,
                type: "SYSTEM"
            }],
            status: "PENDING",
            project: projectId
        }

        if (description) {
            taskObj.log.push({
                comment: description,
                from: user,
                at: now,
                type: "COMMENT"
            })
        }

        const task = this.tasks.newDocument(taskObj)
        return task.save()
    }

    async generateDump() {
        // await this.projects.remove()
        // await this.tasks.remove()

        const projects: any[] = [];
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
            // this.addTask(`Task ${k}`, projects[pr]._id, "lorem ipsum dolor")
        }

    }

}
