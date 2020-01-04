import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RxDocument } from 'rxdb'
import { Agreement } from '../../@shared/models/agreement'
import { AgreementsRepo } from '../../@shared/repos/agreements.repo'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html'

})
export class AgreementComponent implements OnInit {

  @ViewChild('content', { static: false }) private content: ElementRef
  editDesc = false
  agreementId: any
  agreement: Agreement
  breadcrumb

  constructor (
    private agreementsService: AgreementsRepo,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async params => {
      this.agreementId = params['id']
      await this.load()
    })
  }

  enableEdit () {
    this.editDesc = true
    setTimeout(() => {
      this.content.nativeElement.focus()
    })
  }

  async updateDesc (content) {
    this.editDesc = false
    const agreement = await this.agreementsService.one(this.agreementId)
    const _content = content.trim()
    if (agreement.content === _content) return
    await (agreement as RxDocument<Agreement>).update({
      $set: {
        content: _content,
        updatedAt: Date.now()
      }
    })
  }

  private async load () {
    this.agreement = await this.agreementsService.one(this.agreementId)
    this.breadcrumb = [
      { url: ['/business/agreements'], label: 'Agreements' },
      { label: this.agreement.serial }
    ]
  }
}
