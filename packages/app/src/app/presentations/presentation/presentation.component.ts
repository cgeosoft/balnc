import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxDocument } from 'rxdb'
import { AddPageComponent } from '../add-page/add-page.component'
import { Presentation, PresentationStats } from '../_shared/models/presentation'
import { PresentationsRepo } from '../_shared/repos/presentations.repo'
import { PresentationsService } from '../_shared/services/presentations.service'

@Component({
  selector: 'app-presentations-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  host: { 'class': 'page' }
})
export class PresentationComponent implements OnInit {

  @ViewChild('presentElem', { static: false }) presentElem: ElementRef

  activePageIndex: number = 0
  imageData: string
  pages: any[] = []
  presentation: Presentation

  presenting = false

  menu = {
    selected: 'slides',
    items: [{
      id: 'overview',
      label: 'Overview',
      icon: ['fas', 'chart-line']
    }, {
      id: 'slides',
      label: 'Slides',
      icon: ['far', 'images']
    }, {
      id: 'raw',
      label: 'Raw',
      icon: ['fas', 'code']
    }]
  }

  chart = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    },
    options: {
      legend: false,
      responsive: true,
      maintainAspectRatio: false,
      borderColor: '#FFFFFF',
      scales: {
        yAxes: { display: false },
        xAxes: { display: false }
      }
    }
  }

  events = [
    { type: 'CREATE', time: 1532864081000, ref: '90a4356e-97d1-4448-a562-f713635a0c45', user: 'demo' },
    { type: 'PRESENT_START', time: 1532864181000, ref: '90a4356e-97d1-4448-a562-f713635a0c4d', user: 'demo' },
    { type: 'PRESENT_END', time: 1532864221000, ref: '2d11b8dd-c989-4058-8245-cb6817d35a71', user: 'demo' },
    { type: 'CHANGE', time: 1532864311000, ref: 'e90c6f9b-3440-4b2a-ad0a-05d36000b132', user: 'demo' },
    { type: 'PRESENT_START', time: 1532864341000, ref: '82acceb2-f22b-4ed6-bf20-7e487c39b1b5', user: 'demo' },
    { type: 'CHANGE', time: 1532864411000, ref: '5276f818-995f-4ab8-8c59-0c5122c084a6', user: 'demo' },
    { type: 'CHANGE', time: 1532864581000, ref: '85f801d2-5798-497a-a19c-b73caa589f2a', user: 'demo' },
    { type: 'PRESENT_END', time: 1532864681000, ref: '371998c3-011b-40b7-932a-d1eb1c2d17e5', user: 'demo' },
    { type: 'CHANGE', time: 1532864781000, ref: '53429d4f-1508-48db-bf49-17f9e7a2cb80', user: 'demo' },
    { type: 'PRESENT_START', time: 1532864791000, ref: 'b254190e-b24a-4a12-876c-a9c92e74ee86', user: 'demo' },
    { type: 'PRESENT_END', time: 1532864799000, ref: 'c0d47163-baca-448b-b204-baff43926395', user: 'demo' }
  ]
  stats: PresentationStats

  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
    private presentationsRepo: PresentationsRepo,
    private presentationsService: PresentationsService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(async params => {
        this.presentation = await this.presentationsRepo.one(params['id'])
        // this.stats = await this.presentationsRepo.getStats(this.presentation)
        await this.setPageIndex(0)
      })

    // let sf = screenfull
    // sf.on('change', (ev) => {
    //   console.log(ev)
    //   this.presenting = !this.presenting
    // })

    this.events = this.events
      .sort((a, b) => {
        if (a.time > b.time) { return -1 }
        if (a.time < b.time) { return 1 }
        return 0
      })
  }

  async deletePresentation() {
    await this.presentationsRepo.remove(this.presentation._id)
    await this.router.navigateByUrl('/presentations')
  }

  async addImage() {
    const modalRef = this.modal.open(AddPageComponent)
    modalRef.componentInstance.presentation = this.presentation
    await modalRef.result
    await this.setPageIndex(0)
  }

  async deletePage(index) {
    const _pages = this.presentation.pages
    _pages.splice(index, 1)
    this.presentation.pages = _pages
    this.presentation.dateUpdated = Date.now()
    await this.presentationsRepo.update(this.presentation._id, { $set: this.presentation })
    await this.cleanupFiles()
  }

  async cleanupFiles() {
    const usedFiles = this.presentation.pages
      .map(page => {
        return page.params.image
      })

    const doc = this.presentation as RxDocument<Presentation>
    const attachments = doc.allAttachments()

    for (const attachment of attachments) {
      if (usedFiles.indexOf(attachment.id) === -1) {
        await attachment.remove()
      }
    }
  }

  async setPageIndex(index: number) {
    this.activePageIndex = index
    if (this.presentation.pages.length === 0) {
      return
    }
    const contentImage = this.presentation.pages[index].params.image
    this.imageData = await this.presentationsService.getImage(this.presentation, contentImage)
  }

  async startPresentation() {
    this.pages = []
    let proms = []

    this.presentation.pages.forEach((p, i) => {
      const prom = this.presentationsService
        .getImage(this.presentation, p.params.image)
        .then(r => { this.pages[i] = r })
      proms.push(prom)
    })

    // let sf = screenfull
    // if (sf.isEnabled) {
    //   await sf.toggle(this.presentElem.nativeElement)
    // }
  }

  async goToFirst() {
    await this.setPageIndex(0)
  }

  async goToPrevious() {
    if (this.activePageIndex <= 0) { return }
    await this.setPageIndex(this.activePageIndex - 1)
  }

  async goToNext() {
    if (this.activePageIndex >= this.presentation.pages.length - 1) { return }
    await this.setPageIndex(this.activePageIndex + 1)
  }

  async goToLast() {
    await this.setPageIndex(this.presentation.pages.length - 1)
  }

}
