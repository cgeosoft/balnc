import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProjectsResolver implements Resolve<void> {
  constructor (
    private projectsService: ProjectsService
  ) {}

  async resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    await this.projectsService.setup()
  }
}
