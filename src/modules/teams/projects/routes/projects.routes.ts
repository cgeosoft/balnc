import { Routes } from "@angular/router";
import { ProjectsService } from "@blnc/teams/projects/services/projects.service";
import { OverviewComponent } from "@blnc/teams/projects/components/overview/overview.component";
import { ProjectsComponent } from "@blnc/teams/projects/components/projects/projects.component";
import { ProjectComponent } from "@blnc/teams/projects/components/project/project.component";
import { TaskComponent } from "@blnc/teams/projects/components/task/task.component";
import { MainComponent } from "@blnc/teams/projects/components/_main/main.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'manage', component: ProjectsComponent },
    { path: ':id', component: ProjectComponent },
    { path: 'tasks/:id', component: TaskComponent },
    { path: '', redirectTo: "overview" },
  ],
}]

export const ProjectRoutes = routes
