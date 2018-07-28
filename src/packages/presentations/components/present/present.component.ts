import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as screenfull from 'screenfull'

import { Presentation } from '../../models/presentation'
import { PresentationsService } from '../../services/presentations.service'

@Component({
  selector: 'presentations-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss']
})
export class PresentComponent implements OnInit {

  @ViewChild('present') present: ElementRef

  activePageIndex: Number = 0
  imageData: string
  pages: any[] = []
  presentation: Presentation

  constructor (
    private route: ActivatedRoute,
    private presentationsService: PresentationsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(params => {
        this.setup(params['id'])
      })
  }

  private async setup (presentationId: string) {
    this.presentation = await this.presentationsService.getPresentation(presentationId)

    this.pages = []
    let proms = []

    this.presentation.pages.forEach((p, i) => {
      const prom = this.presentationsService
        .getImage(this.presentation, p.params.image)
        .then(r => { this.pages[i] = r })
      proms.push(prom)
    })

    await Promise.all(proms)
  }

  toggleFullscreen () {
    if (screenfull.enabled) {
      screenfull.toggle(this.present.nativeElement)
    }
  }

}
