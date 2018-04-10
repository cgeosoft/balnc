import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '@blnc/core/profile/data/profile';
import { ProfileService } from '@blnc/core/profile/services/profile.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: "./status-bar.component.html",
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  selected: Profile

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.selected = this.profileService.get()
  }

}
