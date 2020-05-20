import { Component } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { DemoComponent } from './demo/demo.component'

@Component({
  selector: 'app-settings-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent {

  constructor (
    private modal: NgbModal
  ) { }

  throwError () {
    throw Error('test error')
  }

  openGenerate () {
    this.modal.open(DemoComponent, { size: 'lg' })
  }

}
