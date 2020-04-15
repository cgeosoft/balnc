import { Component, OnInit } from '@angular/core'
import { scan } from 'rxjs/operators'
import { DemoService } from '../../@core/services/demo.service'

@Component({
  selector: 'app-demo-data',
  templateUrl: './demo-data.component.html'
})
export class DemoDataComponent implements OnInit {
  loading: boolean
  logs: any[] = []
  logs$: any

  constructor (
    private demoService: DemoService
  ) {
  }

  ngOnInit () {
    this.logs$ = this.demoService.logs$.pipe(
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
    this.loading = false
  }

  async clear () {
    if (!confirm('Are you sure?')) return
    this.loading = true
    await this.demoService.clear()
    this.loading = false
  }
}
