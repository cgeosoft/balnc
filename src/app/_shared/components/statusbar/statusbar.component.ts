import { Component, Input } from '@angular/core';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html'
})
export class StatusbarComponent {

  @Input() version
  @Input() profile: Profile
}
