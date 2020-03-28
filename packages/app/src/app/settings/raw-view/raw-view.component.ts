import { Component, Input, OnInit } from '@angular/core'
import { Workspace } from '@balnc/shared'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ConfigService } from './../../@core/services/config.service'

@Component({
  selector: 'app-settings-raw-view',
  templateUrl: './raw-view.component.html'
})
export class RawViewComponent implements OnInit {
  @Input() workspace: Workspace

  source: string
  options: any = { maxLines: 1000, printMargin: true }
  err = false

  get modal () {
    return this.activeModal
  }

  constructor (
    private activeModal: NgbActiveModal,
    private configService: ConfigService
  ) { }

  ngOnInit (): void {
    this.source = JSON.stringify(this.workspace, null, 2)
  }

  save () {
    try {
      this.err = false
      const workspace = JSON.parse(this.source)
      this.configService.save(workspace)
    } catch (err) {
      this.err = true
    }
  }

}
