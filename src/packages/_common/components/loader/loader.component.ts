import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'common-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() animation
  @Input() label

  constructor() { }

  ngOnInit() {
  }

}
