import { Component, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { scan } from 'rxjs/operators'
import { DemoService } from './demo.service'

@Component({
  selector: 'app-settings-developer-demo',
  templateUrl: './demo.component.html',
  providers: [
    DemoService
  ]
})
export class DemoComponent implements OnInit {
  loading: boolean
  logs: any[] = []
  logs$: any

  get m () {
    return this.activeModal
  }

  constructor (
    private activeModal: NgbActiveModal,
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
  }

  async generate () {
    // if (!confirm('Are you sure?')) return
    this.loading = true
    await this.demoService.generate()
    this.loading = false
  }

  async clear () {
    // if (!confirm('Are you sure?')) return
    this.loading = true
    await this.demoService.clear()
    this.loading = false
  }
}
