import { Component, Input, OnInit } from '@angular/core'
import { Profile } from '@balnc/shared'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ConfigService } from './../../@core/services/config.service'

@Component({
  selector: 'app-settings-raw-view',
  templateUrl: './raw-view.component.html'
})
export class RawViewComponent implements OnInit {
  @Input() profile: Profile

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
    this.source = JSON.stringify(this.profile, null, 2)
  }

  save () {
    try {
      this.err = false
      const profile = JSON.parse(this.source)
      this.configService.save(profile)
    } catch (err) {
      this.err = true
    }
  }

}
