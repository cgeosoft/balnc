import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-panel',
  templateUrl: "./empty-panel.component.html",
  styleUrls: ['./empty-panel.component.scss']
})
export class EmptyPanelComponent implements OnInit {

  @Input() message = "Nothing where found"

  @Input() icon = "folder-open-o"

  constructor() { }

  ngOnInit() {
  }

}
