import { Routes } from "@angular/router";
import { ProjectsService } from "@balnc/team/projects/services/projects.service";
import { OverviewComponent } from "@balnc/team/projects/components/overview/overview.component";
import { ProjectsComponent } from "@balnc/team/projects/components/projects/projects.component";
import { ProjectComponent } from "@balnc/team/projects/components/project/project.component";
import { TaskComponent } from "@balnc/team/projects/components/task/task.component";
import { MainComponent } from "@balnc/team/projects/components/_main/main.component";

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
