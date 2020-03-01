import { Component, OnDestroy, OnInit } from '@angular/core'
import { Signal, SignalService } from '@balnc/core'
import { Subscription } from 'rxjs'
import { BusinessDemoService } from '../../business/@shared/services/demo.service'

@Component({
  selector: 'app-demo-data',
  templateUrl: './demo-data.component.html'
})
export class DemoDataComponent implements OnInit, OnDestroy {
  demoWorking: boolean
  signalLogs$: any
  sub: Subscription

  constructor (
    private signalService: SignalService,
    private v: BusinessDemoService
  ) {
    this.signalLogs$ = this.signalService.logs$
  }

  ngOnInit () {
    this.sub = this.signalService
      .events(Signal.DEMO_COMPLETED)
      .subscribe(() => {
        this.demoWorking = false
      })
  }

  ngOnDestroy () {
    this.sub.unsubscribe()
  }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    this.demoWorking = true
    this.signalService.broadcast(Signal.DEMO_GENERATE)
  }

  async clearDemoData () {
    if (!confirm('Are you sure?')) return
    this.demoWorking = true
    this.signalService.broadcast(Signal.DEMO_CLEAR)
  }
}
