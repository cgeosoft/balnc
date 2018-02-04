import { Injectable } from "@angular/core"

import * as moment from 'moment'
import { DatabaseService } from "../../../_core/database/services/database.service"
import { RxProjectDocument } from "../data/project"
import { RxTaskDocument } from "../data/task"
import { RxCollection } from "rxdb"
import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

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
        console.log("async")
        this.projects = await this.dbService.get<RxProjectDocument>("project")
        this.tasks = await this.dbService.get<RxTaskDocument>("task")
    }

    getProjects() {
        console.log("getProjects")
        return this.projects.find().$
            .map((data) => {
                if (!data) { return data }
                data.sort((a, b) => {
                    return a.name < b.name ? -1 : 1
                })
                return data
            })
    }

    getProject(projectId) {
        console.log("getProject", projectId)
        return this.projects.findOne(projectId).$
    }

    addProject(name: string, description: string) {
        console.log("addProject")
        const project = this.projects.newDocument({
            name: name,
            description: description,
        })
        return project.save()
    }

    getTasks(params: any = {}) {
        console.log("getTasks", params)
        return this.tasks
            .find(params.query).$
            .map((data) => {
                if (!data) { return data }
                data.sort((a, b) => {
                    return a.updatedAt > b.updatedAt ? -1 : 1
                })
                return data
            })
    }

    getTask(taskId) {
        console.log("getTask", taskId)
        return this.tasks.findOne(taskId).$
    }

    addTask(title: string, projectId: string, description: string) {
        console.log("addTask")
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

        let projects: any[] = [];
        for (let i = 0; i < 10; i++) {
            const project = await this.projects.insert({
                name: `Project ${i}`,
                description: "lorem ipsum dolor"
            })
            projects.push(project);
        }

        for (let k = 0; k < 100; k++) {
            const pr = Math.floor(Math.random() * 9)
            this.addTask(`Task ${k}`, projects[pr]._id, "lorem ipsum dolor")
        }

    }

}
