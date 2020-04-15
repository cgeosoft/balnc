import { NgModule } from '@angular/core'
import { IssuesRepo } from './@shared/repos/issues.repo'
import { PEventsRepo } from './@shared/repos/pevents.repo'
import { ProjectsRepo } from './@shared/repos/projects.repo'

@NgModule({
  providers: [
    PEventsRepo,
    IssuesRepo,
    ProjectsRepo
  ]
})
export class ProjectsDataModule {
}
