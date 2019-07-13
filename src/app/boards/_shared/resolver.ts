import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BoardsService } from './boards.service';

@Injectable()
export class BoardsResolver implements Resolve<void> {
  constructor(
    private boardsService: BoardsService
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    await this.boardsService.setup()
  }
}
