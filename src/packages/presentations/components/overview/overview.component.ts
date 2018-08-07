import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from 'lodash'
import * as moment from 'moment'

import { PresentationsService } from '../../presentations.service'
import { Presentation } from '../../models/presentation'

@Component({
  selector: 'presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  presentations: any[] = null

  constructor (
    private modal: NgbModal,
    private presentationsService: PresentationsService
  ) { }

  ngOnInit () {
    this.load()
  }

  async load () {
    this.presentations = await this.presentationsService.getPresentations()
  }

  async create () {
    // await this.modal.open(CreatePresentationComponent).result
    this.load()
  }

  getLastEdit (presentation: Presentation) {
    return moment(presentation.dateUpdated).fromNow()
  }

}
