import { ChangeDetectionStrategy, Component, ElementRef, Input, SimpleChanges } from '@angular/core'
import { Subscription } from 'rxjs'
import { TableSchema } from './table-schema'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() schema: TableSchema
  @Input() data: any[]
  @Input() debug: any
  @Input() templates: { [key: string]: ElementRef }

  showDebug = false
  page = 0
  pages: number[]

  limit = 10
  sub: Subscription

  ngOnChanges (changes: SimpleChanges): void {
    if (this.data) {
      this.calculatePages()
    }
  }

  ngOnDestroy (): void {
    this.sub.unsubscribe()
  }

  calculatePages () {
    let pages = Math.floor(this.data.length / this.limit)
    pages += (this.data.length % this.limit > 0) ? 1 : 0
    this.pages = Array.from(Array(pages), (x, index) => index)
  }

  resetLimit (limit) {
    this.page = 0
    this.limit = parseInt(limit, 10)
    this.calculatePages()
  }

  previous () {
    if (this.page > 0) {
      this.page -= 1
    }
  }

  next () {
    if (this.page < this.pages.length - 1) {
      this.page += 1
    }
  }
}
