import { Injectable } from '@angular/core'
import { ConfigService } from '@balnc/core'
import * as faker from 'faker'
import { Issue, IssueStatus, IssueType, Project } from '../models/all'
import { IssuesRepo } from '../repos/issues.repo'
import { ProjectsRepo } from '../repos/projects.repo'

@Injectable()
export class DemoService {

  constructor (
    private projectsRepo: ProjectsRepo,
    private issuesRepo: IssuesRepo,
    private configService: ConfigService
  ) { }

  async generate (size = 1) {
    console.log(`generate ${size} projects`)
    for (let i = 0; i < size; i++) {
      const pdata: Partial<Project> = {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        isArchived: Math.random() > .6,
        tags: ['lorem', 'ispun'],
        features: {}
      }
      let project = await this.projectsRepo.add(pdata)
      console.log(`add project ${i}:${project._id}`)

      await this.projectsRepo.mark(project._id)

      console.log(`generate 5 issues for ${project._id}`)
      for (let k = 0; k < 5; k++) {
        const idata: Partial<Issue> = {
          title: faker.hacker.phrase(),
          description: faker.lorem.paragraphs(),
          type: IssueType[IssueType[Math.floor(Math.random() * Object.keys(IssueType).length / 2)]],
          user: this.configService.username,
          status: IssueStatus.pending
        }
        const issue = await this.issuesRepo.add(idata,project._id,faker.date.past().getTime())
        console.log(`add issue ${k}:${issue._id} to project ${project._id}`)
      }
    }
  }
}
