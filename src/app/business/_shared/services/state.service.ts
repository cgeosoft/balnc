import { Injectable } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { LocalStorage } from 'ngx-store'
import { OpenedItem as SideItem } from '../models/general'

@Injectable()
export class StateService {

  @LocalStorage() opened: { [key: string]: SideItem[] } = {}

  constructor (
    private configService: ConfigService
  ) { }

  add (item: SideItem) {
    let allItems = { ...this.opened }
    if (! allItems[this.configService.selected]) {
      allItems[this.configService.selected] = []
    }
    let items = allItems[this.configService.selected]
    if (items.findIndex(i => i.key === item.key) !== -1) {
      return
    }
    items.push(item)
    this.opened = allItems
  }

  close (index) {
    let allItems = { ...this.opened }
    let items = allItems[this.configService.selected] || []
    items.splice(index, 1)
    this.opened = allItems
  }

  closeAll () {
    let allItems = { ...this.opened }
    allItems[this.configService.selected] = []
    this.opened = allItems
  }

}
