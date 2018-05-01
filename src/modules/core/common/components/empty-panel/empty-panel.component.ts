import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '@blnc/core/common/services/helper.service';

@Component({
  selector: 'app-empty-panel',
  templateUrl: "./empty-panel.component.html",
  styleUrls: ['./empty-panel.component.scss']
})
export class EmptyPanelComponent implements OnInit {

  @Input() message = "Nothing where found"
  @Input() submessage = null
  @Input() icon = "folder-open-o"

  constructor() { }

  ngOnInit() {
    this.icon = HelperService.getIconClass(this.icon, true)
  }

}
