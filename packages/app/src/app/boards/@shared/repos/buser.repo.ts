import { Injectable, Injector } from '@angular/core'
import { ConfigService, Repository } from '@balnc/core'
import { BUser } from '../models/buser'

@Injectable({
  providedIn: 'root'
})
export class BUsersRepo extends Repository<BUser> {

  interv

  constructor (
    private configService: ConfigService,
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.buser'
  }

  async join (board) {
    const busers = await this.all({
      group: this.configService.username
    })
    const buser = busers.find(bu => bu.board === board)

    if (buser) {
      buser.lastread = Date.now()
      await this.update(buser._id, buser)
    } else {
      const newbuser: Partial<BUser> = {
        board,
        lastread: Date.now()
      }
      await this.add(newbuser, this.configService.username)
    }
  }

  async leave (board) {
    const busers = await this.all({
      group: this.configService.username
    })
    const buser = busers.find(bu => bu.board === board)

    if (buser) {
      buser.lastread = Date.now()
      await this.update(buser._id, buser)
    }
  }
}
