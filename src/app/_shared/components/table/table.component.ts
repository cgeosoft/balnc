import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core'
import { Subscription } from 'rxjs'
import { TableSchema } from './table-schema'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input() schema: TableSchema
  @Input() data: any[]
  @Input() debug: any
  @Input() templates: { [key: string]: ElementRef }

  showDebug = false
  page = 0
  totalPages: number[]
  pages: number[]

  limit = 30
  sub: Subscription
  properties: any
  settings = {
    enabledProperties: {}
  }

  ngOnInit (): void {
    this.schema.properties.forEach((p, i) => {
      this.settings.enabledProperties[i] = true
    })
    this.calculateProperties()
  }

  calculateProperties () {
    console.log('calculateProperties', this.settings.enabledProperties)
    this.properties = this.schema.properties.filter((p, i) => this.settings.enabledProperties[i])
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (this.data) {
      this.calculatePages()
    }
  }

  calculatePages () {
    let pages = Math.floor(this.data.length / this.limit)
    pages += (this.data.length % this.limit > 0) ? 1 : 0
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
