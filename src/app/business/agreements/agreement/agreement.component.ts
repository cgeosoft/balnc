import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Agreement } from '../../_shared/models/agreement'
import { AgreementsService } from '../../_shared/services/agreements.service'

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  host: { 'class': 'page' }
})
export class AgreementComponent implements OnInit {

  @ViewChild('content', { static: false }) private content: ElementRef
  editDesc = false
  agreementId: any
  agreement: Agreement
  breadcrumb

  constructor (
    private agreementsService: AgreementsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(params => {
        this.agreementId = params['id']
        this.setup()
      })
  }

  private async setup () {
    this.agreement = await this.agreementsService.getOne<Agreement>('agreements', this.agreementId)
    this.breadcrumb = [
      { url: ['/business/agreements'], label: 'Agreements' },
      { label: this.agreement.serial }
    ]
  }

  enableEdit () {
    this.editDesc = true
    setTimeout(() => {
      this.content.nativeElement.focus()
    })
  }

  async updateDesc (content) {
    this.editDesc = false
    const agreement = await this.agreementsService.getOne<Agreement>('agreements', this.agreementId)
    const _content = content.trim()
    if (agreement.content === _content) return
    await agreement.update({
      $set: {
        content: _content,
        updatedAt: Date.now()
      }
    })
  }
}
