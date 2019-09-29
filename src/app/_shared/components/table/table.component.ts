import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core'
import { LocalStorage } from 'ngx-store'
import { Observable, Subscription } from 'rxjs'
import { TableSchema } from './table-schema'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() schema: TableSchema
  @Input() data$: Observable<any[]>
  @Input() debug: any
  @Input() templates: { [key: string]: ElementRef }

  showDebug = false
  page = 0
  totalPages: number[]
  pages: number[]

  dataLength = 0
  limit = 30
  sub: Subscription
  properties: any

  @LocalStorage('table_settings') settings: any = {}

  ngOnInit (): void {
    this.updateSettings()
    this.data$.subscribe((data) => {
      this.dataLength = data.length
      this.calculatePages()
    })
    this.calculateProperties()
  }

  updateSettings () {
    this.settings[this.schema.name] = this.settings[this.schema.name] || { visible: {} }
    this.schema.properties.forEach((p, i) => {
      this.settings[this.schema.name].visible[i] = this.settings[this.schema.name].visible[i] || !p.hidden
    })
    this.settings.save()
  }

  calculateProperties () {
    this.properties = this.schema.properties.filter((p, i) => this.settings[this.schema.name].visible[i])
  }

  calculatePages () {
    let pages = Math.floor(this.dataLength / this.limit)
    pages += (this.dataLength % this.limit > 0) ? 1 : 0
    this.totalPages = Array.from(Array(pages), (x, index) => index)
    this.movePageWindow()
  }

  movePageWindow () {
    if (this.totalPages.length <= 5) {
      this.pages = this.totalPages
    } else if (this.page <= 2) {
      this.pages = [0, 1, 2, 3, 4]
    } else if (this.page >= this.totalPages.length - 3) {
      this.pages = [
        this.totalPages.length - 5,
        this.totalPages.length - 4,
        this.totalPages.length - 3,
        this.totalPages.length - 2,
        this.totalPages.length - 1
      ]
    } else {
      this.pages = [
        this.page - 2,
        this.page - 1,
        this.page,
        this.page + 1,
        this.page + 2
      ]
    }
  }

  resetLimit (limit) {
    this.page = 0
    this.limit = parseInt(limit, 10)
    this.calculatePages()
  }

  previous () {
    if (this.page > 0) {
      this.page -= 1
      this.movePageWindow()
    }
  }

  next () {
    if (this.page < this.totalPages.length - 1) {
      this.page += 1
      this.movePageWindow()
    }
  }

  first () {
    this.page = 0
    this.movePageWindow()
  }

  last () {
    this.page = this.totalPages.length - 1
    this.movePageWindow()
  }
}
