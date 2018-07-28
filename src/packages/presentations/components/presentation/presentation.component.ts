import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import * as screenfull from 'screenfull'
import * as _ from 'lodash'
import * as moment from 'moment'

import { Presentation } from '../../models/presentation'
import { PresentationsService } from '../../services/presentations.service'
import { AddPageComponent } from '../add-page/add-page.component'

@Component({
  selector: 'presentations-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  @ViewChild('presentElem') presentElem: ElementRef

  activePageIndex: Number = 0
  imageData: string
  pages: any[] = []
  presentation: Presentation

  presenting = false

  tabsMenu = {
    active: 'overview',
    tabs: [{
      id: 'overview',
      label: 'Overview',
      icon: 'tasks'
    }, {
      id: 'slides',
      label: 'Slides',
      icon: 'tasks'
    }, {
      id: 'manage',
      label: '',
      icon: 'cog',
      right: true
    }],
    select: (tabId) => {
      this.tabsMenu.active = tabId
    }
  }

  constructor (
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
    private presentationsService: PresentationsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        this.presentation = await this.presentationsService.getPresentation(params['id'])
        this.setPageIndex(0)
      })

    screenfull.on('change', (ev) => {
      console.log(ev)
      this.presenting = !this.presenting
    })
  }

  deletePresentation () {
    this.presentation.remove()
    this.router.navigateByUrl('/presentations')
  }

  async addPage () {
    const modalRef = this.modal.open(AddPageComponent)
    modalRef.componentInstance.presentation = this.presentation
    await modalRef.result
    this.setPageIndex(0)
  }

  async deletePage (index) {
    const _pages = this.presentation.pages
    _pages.splice(index, 1)
    this.presentation.pages = _pages
    this.presentation.dateUpdated = moment().toISOString()
    await this.presentation.save()
    await this.cleanupFiles()
  }

  async cleanupFiles () {
    const usedFiles = this.presentation.pages
      .map(page => {
        return page.params.image
      })

    const attachments = await this.presentation.allAttachments()

    for (const attachment of attachments) {
      if (usedFiles.indexOf(attachment.id) === -1) {
        await attachment.remove()
      }
    }
  }

  async setPageIndex (index) {

    this.activePageIndex = index
    if (this.presentation.pages.length === 0) {
      return
    }
    const contentImage = this.presentation.pages[index].params.image
    this.imageData = await this.presentationsService.getImage(this.presentation, this.presentation.pages[index].params.image)
  }

  async startPresentation () {
    this.pages = []
    let proms = []

    this.presentation.pages.forEach((p, i) => {
      const prom = this.presentationsService
        .getImage(this.presentation, p.params.image)
        .then(r => { this.pages[i] = r })
      proms.push(prom)
    })

    if (screenfull.enabled) {
      screenfull.toggle(this.presentElem.nativeElement)
    }
  }
}
