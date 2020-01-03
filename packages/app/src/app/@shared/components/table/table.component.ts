import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core'
import { LocalStorage } from 'ngx-store'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { TableSchema } from './table-schema'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() schema: TableSchema
  @Input() data$: Observable<any[]>
  @Input() debug: any
  @Input() templates: { [key: string]: ElementRef }
  @Input() paggination = false

  @ViewChild('wrapper', { static: false }) wrapper: ElementRef
  @ViewChild('tableWrapper', { static: false }) tableWrapper: ElementRef
  @ViewChild('table', { static: false }) table: ElementRef

  showDebug = false
  page = 0
  totalPages: number[]
  pages: number[]

  dataLength = 0
  viewlimit = null
  limit = null
  sub: Subscription
  properties: any

  headerHeight = 50
  footerHeight = 52
  rowHeight = 50

  @LocalStorage('table_settings') settings: any = {}
  emitted: any

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.updateSettings()
    this.data$.subscribe((data) => {
      this.dataLength = data.length
      this.calculatePages()
      this.cd.markForCheck()
    })
    this.calculateProperties()
  }

  ngAfterViewInit() {
    this.viewlimit = null
    this.calculatePagination()
    this.calculatePages()

    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(200)
        )
        .subscribe(() => {
          this.zone.run(() => {
            this.calculatePagination()
            this.calculatePages()
            this.cd.markForCheck()
          })
        })
      fromEvent(this.tableWrapper.nativeElement, 'scroll')
        .pipe(
          debounceTime(200)
        )
        .subscribe(() => {
          this.zone.run(() => {
            this.scroll()
          })
        })
    })
  }

  scroll(): void {
    if (this.tableWrapper.nativeElement.offsetHeight + this.tableWrapper.nativeElement.scrollTop - this.table.nativeElement.offsetHeight > this.rowHeight * 2 * -1) {
      this.limit += this.viewlimit
      this.calculatePages()
      this.cd.markForCheck()
    }
  }

  private calculatePagination() {
    let tableHeight = this.wrapper.nativeElement.offsetHeight
    if (!this.viewlimit) tableHeight += 81
    this.tableWrapper.nativeElement.scrollTop = 0
    this.viewlimit = this.limit = Math.floor(((tableHeight - this.headerHeight - this.footerHeight) / this.rowHeight) + 5)
  }

  updateSettings() {
    this.settings[this.schema.name] = this.settings[this.schema.name] || { visible: {} }
    this.schema.properties.forEach((p, i) => {
      this.settings[this.schema.name].visible[i] = this.settings[this.schema.name].visible[i] || !p.hidden
    })
    this.settings.save()
  }

  calculateProperties() {
    this.properties = this.schema.properties.filter((p, i) => this.settings[this.schema.name].visible[i])
  }

  calculatePages() {
    if (this.limit < 1) return
    let pages = Math.floor(this.dataLength / this.limit)
    pages += (this.dataLength % this.limit > 0) ? 1 : 0
    this.totalPages = Array.from(Array(pages), (x, index) => index)
    if (this.page >= pages && pages) this.page = pages - 1
    this.movePageWindow()
  }

  movePageWindow() {
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

  resetLimit(limit) {
    this.page = 0
    this.limit = parseInt(limit, 10)
    this.calculatePages()
  }

  previous() {
    if (this.page > 0) {
      this.page -= 1
      this.movePageWindow()
    }
  }

  next() {
    if (this.page < this.totalPages.length - 1) {
      this.page += 1
      this.movePageWindow()
    }
  }

  first() {
    this.page = 0
    this.movePageWindow()
  }

  last() {
    this.page = this.totalPages.length - 1
    this.movePageWindow()
  }

  getBadge(badges: any[], badge: any) {
    if (badges[badge]) {
      return badges[badge]
    }
    return {
      class: null,
      label: 'Unknown',
      color: '#DDD'
    }
  }
}
