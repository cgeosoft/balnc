import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import * as _ from "lodash"
import * as moment from "moment"

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxPresentationDocument } from '../../data/presentation'
import { UploadComponent } from "../upload/upload.component"
import { AddPageComponent } from "../add-page/add-page.component"
import { RxCollection, RxDocumentBase } from 'rxdb'


@Component({
  selector: 'app-presentations-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {

  activePageIndex: Number = 0
  imageData: string
  db: RxCollection<RxPresentationDocument>
  sub
  presentation: RxDocumentBase<RxPresentationDocument> & RxPresentationDocument

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
  }

  upload() {
    const modalRef = this.modal.open(UploadComponent)
    modalRef.result
      .then((result) => {
        this.presentation.pages.push({
          "key": "1",
          "title": "lala",
          "preview": result,
          "type": "BGIMG",
          "params": {
            "image": "http://lorempixel.com/1024/1024/cats/1"
          }
        })
        this.presentation.save()
      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  addPage() {

    const modalRef = this.modal.open(AddPageComponent)
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
              preview: "http://lorempixel.com/90/90/cats/1/",
              type: "BGIMG",
              params: {
                image: `file-${pageKey}`
              }
            })

            this.presentation.set('pages', _pages);
            this.presentation.save()

            this.setPageIndex(0)
          })

      }, (reject) => {
        console.log("dismissed", reject)
      })
  }

  async setPageIndex(index) {
    this.activePageIndex = index
    const contentImage = this.presentation.pages[index].params.image
    const attachment = await this.presentation.getAttachment(contentImage)

    if (!attachment) { return }

    const blobBuffer = await attachment.getData();
    console.log(attachment)

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      this.imageData = 'data:' + attachment.type + ';base64,' + base64
    };
    reader.readAsDataURL(blobBuffer);

  }

  private async _show() {
    this.db = await this.dbService.get<RxPresentationDocument>("presentation")

    this.route
      .params
      .subscribe(params => {

        const presentation$ = this.db.findOne(params['id']).$
        this.sub = presentation$
          .subscribe(presentation => {
            this.zone.run(() => {
              this.presentation = presentation
              this.setPageIndex(0)
            })
          })
      })

  }
}
