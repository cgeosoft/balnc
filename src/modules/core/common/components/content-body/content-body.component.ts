import { Component, Input, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-content-body',
  templateUrl: "./content-body.component.html",
  styleUrls: ['./content-body.component.scss']
})
export class ContentBodyComponent implements OnInit {

  @Input() fullWidth
  // @HostBinding('class.container') container = true;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.container = !this.fullWidth;
  }

}
