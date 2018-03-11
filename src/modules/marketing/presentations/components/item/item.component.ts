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

@Component({
  selector: 'app-presentations-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  presentation$: Observable<RxDocumentBase<RxPresentationDocument> & RxPresentationDocument>
  activePageIndex: Number = 0
  imageData: string
  db: RxCollection<RxPresentationDocument>
  sub
  presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument
  settingsMenu: any[] = []
  tabsMenu: any = {}
  statistics: any = {}

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.setup(params['id'])
      })

    this.settingsMenu = [{
      label: "Configure",
      icon: "edit",
      callback: () => {
        console.log("Configure")
      }
    }, {
      label: "Cleanup Files",
      icon: "trash-o",
      callback: () => {
        this.cleanupFiles()
      }
    }, {
      isDivider: true
    }, {
      label: "Delete",
      cssClass: "text-danger",
      icon: "trash-o",
      callback: () => {
        this.deletePresentation()
      }
    }]

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

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  addPage() {

    const modalRef = this.modal.open(AddPageComponent, {
      size: "lg"
    })
    modalRef.result
      .then((page: any) => {

        const pageKey = this.s4() + this.s4()
        const _pages: any[] = this.presentation.pages
        const _att = {
          id: `file-${pageKey}`,
          data: page.file,
          type: page.fileType
        }

        this.presentation
          .putAttachment(_att)
          .then((att) => {

            _pages.unshift({
              key: pageKey,
              title: page.title || `Page ${pageKey}`,
              description: page.description,
              type: "BGIMG",
              params: {
                image: `file-${pageKey}`
              }
            })

            this.presentation.pages = _pages
            this.presentation.dateUpdated = moment().toISOString()
            this.presentation.save()

            this.setPageIndex(0)
          })

      }, (reject) => {
        console.log("dismissed", reject)
      })
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
    const attachment = await this.presentation.getAttachment(contentImage)

    if (!attachment) { return }

    const blobBuffer = await attachment.getData()

    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      this.imageData = 'data:' + attachment.type + ';base64,' + base64
    }
    reader.readAsDataURL(blobBuffer)

  }

  private async setup(presentationId: string) {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")


    this.presentation$ = this.db.findOne(presentationId).$
    this.presentation$
      .subscribe(presentation => {

        this.presentation = presentation

        presentation.pages = presentation.pages || []

        presentation.allAttachments$
          .subscribe((attachments) => {
            this.statistics.totalFilesCount = attachments.length
            this.statistics.totalFilesBytesize = attachments.reduce((t, i) => {
              return t + i.length
            }, 0)
          })

        this.setPageIndex(0)
        this.zone.run(() => { })
      })
  }
}
