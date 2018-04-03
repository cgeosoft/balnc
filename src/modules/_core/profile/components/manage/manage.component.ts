import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxProfileDocument } from '@blnc/core/profile/data/profile'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'
import { ProfileService } from '@blnc/core/profile/services/profile.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {

  alias: any
  selectedProfile: RxProfileDocument
  profile: RxProfileDocument[] = []
  dbProfile: RxCollection<any>

  constructor(
    private modalService: NgbModal,
    private profileService: ProfileService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getProfile()
  }

  async getProfile() {
    // this.profile = await this.profileService.profileDB.find().exec()
  }

  create() {
    this.modalService
      .open(CreateProfileComponent)
      .result
      .then((result) => {
        console.log(`Closed with: ${result}`)
        this.getProfile()
        // this.selectProfile(result)
      }, (reason) => {
        console.log(`Dismissed ${reason}`)
      })
  }

  async select(profile: RxProfileDocument) {
    await this.profileService.selectProfile(profile.alias)
    console.log("Selected", profile)
    this.router.navigate(['/dashboard'])
  }
}
