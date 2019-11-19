import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { AddPageComponent } from '../add-page/add-page.component'
import { Presentation, PresentationStats } from '../_shared/models/presentation'
import { Slide, SlideContentType } from '../_shared/models/slide'
import { SlidesRepo } from '../_shared/repos/pages.repo'
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

  active: number = 0
  previews: string[]
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
  stats: PresentationStats = {}
  slides$: Observable<Slide[]>
  length: number

  constructor (
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private modal: NgbModal,
    private slidesRepo: SlidesRepo,
    private presentationsRepo: PresentationsRepo,
    private presentationsService: PresentationsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        this.presentation = await this.presentationsRepo.one(params['id'])
        this.slides$ = this.slidesRepo.all$().pipe(
          map((slides) => slides.filter(s => s.presentation === params['id'])),
          tap(async (slides) => {
            this.previews = []
            this.length = slides.length
            const ps = slides.map(async (s, i) => {
              this.previews[i] = await this.presentationsService.getImage(s, s.content[0])
            })
            await Promise.all(ps)
          })
        )
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

    // this.addImage()
  }

  async deletePresentation () {
    await this.presentationsRepo.remove(this.presentation._id)
    await this.router.navigateByUrl('/presentations')
  }

  async addImage () {
    const modalRef = this.modal.open(AddPageComponent)
    modalRef.componentInstance.presentation = this.presentation
    const file: File = await modalRef.result

    const slide: Partial<Slide> = {
      title: 'New Page',
      presentation: this.presentation._id,
      content: [
        {
          file: file.name,
          type: SlideContentType.BACKGROUND
        }
      ]
    }

    const slideDoc = await this.slidesRepo.add(slide)
    await this.slidesRepo.upload(slideDoc._id, file)
  }

  async deletePage (index) {
    // todo
  }

  async cleanupFiles () {
    // todo
  }

  async setPageIndex (index: number) {
    this.active = index
  }

  async getPreview (slide: Slide) {
    // const preview = await this.presentationsService.getImage(slide, slide.content[0])
    // return preview
  }

  async startPresentation () {
    // todo
  }

  async goToFirst () {
    this.active = 0
  }

  async goToPrevious () {
    if (this.active <= 0) { return }
    this.active = this.active - 1
  }

  async goToNext () {
    if (this.active >= this.length - 1) { return }
    this.active = this.active + 1
  }

  async goToLast () {
    this.active = this.length - 1
  }

}
