import { Component, Input, OnInit } from '@angular/core'
import { Profile } from '@balnc/shared'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { ConfigService } from './../../@core/services/config.service'

@Component({
  selector: 'app-raw-view',
  templateUrl: './raw-view.component.html'
})
export class RawViewComponent implements OnInit {
  @Input() profile: Profile

  source: string
  options: any = { maxLines: 1000, printMargin: true }

  get modal () {
    return this.activeModal
  }

  constructor (
    private activeModal: NgbActiveModal,
    private configService: ConfigService,
    private toastr: ToastrService
  ) { }

  ngOnInit (): void {
    this.source = JSON.stringify(this.profile, null, 2)
  }

  save () {
    try {
      const profile = JSON.parse(this.source)
      this.configService.saveProfile(profile)
    } catch (err) {
      // this.toastr.error('Profile is invalid')
    }
  }

}
