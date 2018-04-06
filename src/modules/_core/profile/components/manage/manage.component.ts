import { Component, OnInit, ViewChild } from '@angular/core'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { Router } from '@angular/router'

import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'
import { ProfileService } from '@blnc/core/profile/services/profile.service'
import { Profile } from '@blnc/core/profile/data/profile';

@Component({
  selector: 'app-profile-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {

  alias: any
  selectedProfile: Profile
  profiles: Profile[] = []

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
    this.selectedProfile = ProfileService.getSelectedProfile()
    this.profiles = ProfileService.config.profiles
  }

  create() {
    this.modalService
      .open(CreateProfileComponent)
      .result
      .then((result) => {
        this.profiles = ProfileService.config.profiles
      })
  }

  quickCreateProfile() {
    const quickLocalName = "Local Profile #" + (new Date()).getTime()
    ProfileService.addProfile({
      name: quickLocalName
    })
    this.select(quickLocalName)
  }

  select(name: string) {
    ProfileService.selectProfile(name)
    this.router.navigate(['dashboard'])
  }
}
