import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxPresentationDocument } from '../../data/presentation'
import { UploadComponent } from "../upload/upload.component"
import { AddPageComponent } from "../add-page/add-page.component"
import { RxCollection, RxDocumentBase } from 'rxdb'
import { reduce } from 'rxjs/operators/reduce'
import { Date } from 'core-js/library/web/timers'
import { Observable } from 'rxjs/Observable'
import { PresentationsService } from '@blnc/marketing/presentations/services/presentations.service';

@Component({
  selector: 'app-presentations-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  activePageIndex: Number = 0
  imageData: string
  presentation: RxPresentationDocument
  tabsMenu: any = {}

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
    private presentationsService: PresentationsService,
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.setup(params['id'])
      })

    this.tabsMenu = {
      active: "details",
      tabs: [{
        id: "details",
        label: "Details",
        icon: "edit",
      }, {
        id: "settings",
        label: "Settings",
        icon: "cogs",
      }],
      select: (tabId) => {
        this.tabsMenu.active = tabId
      }
    }
  }

  ngOnDestroy() {
  }

  deletePresentation() {
    this.presentation.remove()
    this.router.navigateByUrl('/presentations')
  }

  async addPage() {
    const modalRef = this.modal.open(AddPageComponent)
    modalRef.componentInstance.presentation = this.presentation
    await modalRef.result
    this.setPageIndex(0)
  }

  async deletePage(index) {
    const _pages = this.presentation.pages
    _pages.splice(index, 1)
    this.presentation.pages = _pages
    this.presentation.dateUpdated = moment().toISOString()
    await this.presentation.save()
    await this.cleanupFiles()
  }

  async cleanupFiles() {
    const usedFiles = this.presentation.pages
      .map(page => {
        return page.params.image
      })

    const attachments = await this.presentation.allAttachments()

    for (const attachment of attachments) {
      if (usedFiles.indexOf(attachment.id) === -1) {
        console.log("removing", attachment.id)
        await attachment.remove()
        console.log("removed", attachment.id)
      }
    }
  }

  async setPageIndex(index) {
    this.activePageIndex = index
    if (this.presentation.pages.length === 0) {
      return
    }
    const contentImage = this.presentation.pages[index].params.image
    this.imageData = await this.presentationsService.getImage(this.presentation, this.presentation.pages[index].params.image)
  }

  private async setup(presentationId: string) {
    this.presentation = await this.presentationsService.getPresentation(presentationId)
    this.setPageIndex(0)
  }
}
