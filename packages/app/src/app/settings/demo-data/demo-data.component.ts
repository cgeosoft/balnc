import { Component, OnInit } from '@angular/core'
import { merge } from 'rxjs'
import { scan } from 'rxjs/operators'
import { DemoService } from '../../@core/services/demo.service'
import { BoardsDemoService } from '../../boards/@shared/services/demo.service'

@Component({
  selector: 'app-demo-data',
  templateUrl: './demo-data.component.html'
})
export class DemoDataComponent implements OnInit {
  loading: boolean
  logs: any[] = []
  logs$: any

  constructor (
    private demoService: DemoService,
    private boardDemoService: BoardsDemoService
  ) {
  }

  ngOnInit () {
    this.logs$ = merge(
      this.demoService.logs$,
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
    await this.demoService.generate()
    await this.boardDemoService.generate()
    this.loading = false
  }

  async clear () {
    if (!confirm('Are you sure?')) return
    this.loading = true
    await this.demoService.clear()
    await this.boardDemoService.clear()
    this.loading = false
  }
}
