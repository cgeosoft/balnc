import { Routes } from "@angular/router";
import { ProjectsService } from "@blnc/team/projects/services/projects.service";
import { OverviewComponent } from "@blnc/team/projects/components/overview/overview.component";
import { ProjectsComponent } from "@blnc/team/projects/components/projects/projects.component";
import { ProjectComponent } from "@blnc/team/projects/components/project/project.component";
import { TaskComponent } from "@blnc/team/projects/components/task/task.component";
import { MainComponent } from "@blnc/team/projects/components/_main/main.component";

const routes: Routes = [{
  path: 'projects',
  component: MainComponent,
  resolve: {
    db: ProjectsService,
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'manage', component: ProjectsComponent },
    { path: ':id', component: ProjectComponent },
    { path: 'tasks/:id', component: TaskComponent },
    { path: '', redirectTo: "overview" },
  ],
}]

export const ProjectRoutes = routes
