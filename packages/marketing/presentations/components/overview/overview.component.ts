import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from 'lodash'
import * as moment from 'moment'

import { PresentationsService } from '@balnc/marketing/presentations/services/presentations.service'
import { RxPresentationDocument } from '@balnc/marketing/presentations/data/presentation'
import { CreatePresentationComponent } from "@balnc/marketing/presentations/components/create-presentation/create-presentation.component"


@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  presentations: any[] = null

  constructor(
    private modal: NgbModal,
    private presentationsService: PresentationsService,
  ) { }

  ngOnInit() {
    this.load()
  }

  async load() {
    this.presentations = await this.presentationsService.getPresentations()
  }

  refresh() {
    this.load()
  }

  async create() {
    await this.modal.open(CreatePresentationComponent).result
    this.load()
  }

  getLastEdit(presentation: RxPresentationDocument) {
    return moment(presentation.dateUpdated).fromNow()
  }

}
