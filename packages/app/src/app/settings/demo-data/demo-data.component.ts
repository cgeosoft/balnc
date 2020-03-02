import { Component, OnInit } from '@angular/core'
import { merge } from 'rxjs'
import { scan } from 'rxjs/operators'
import { BoardsDemoService } from '../../boards/@shared/services/demo.service'
import { BusinessDemoService } from '../../business/@shared/services/demo.service'

@Component({
  selector: 'app-demo-data',
  templateUrl: './demo-data.component.html'
})
export class DemoDataComponent implements OnInit {
  loading: boolean
  logs: any[] = []
  logs$: any

  constructor (
    private businessDemoService: BusinessDemoService,
    private boardDemoService: BoardsDemoService
  ) {
  }

  ngOnInit () {
    this.logs$ = merge(
      this.businessDemoService.logs$,
      this.boardDemoService.logs$
    ).pipe(
      scan((logs, msg) => {
        logs.unshift({
          msg,
          date: Date.now()
        })
        return logs
      }, []
      )
    )
    // ).subscribe((msg) => {
    //   this.logs.unshift({
    //     msg,
    //     date: Date.now()
    //   })
    // })
  }

  async generate () {
    if (!confirm('Are you sure?')) return
    this.loading = true
    await this.businessDemoService.generate()
    await this.boardDemoService.generate()
    this.loading = false
  }

  async clear () {
    if (!confirm('Are you sure?')) return
    this.loading = true
    await this.businessDemoService.clear()
    await this.boardDemoService.clear()
    this.loading = false
  }
}
