import { Component, NgZone, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Document } from '../@shared/document'
import { DocumentsRepo } from '../@shared/documents.repo'
import { Line } from '../@shared/line'
import { LinesRepo } from '../@shared/lines.repo'

@Component({
  selector: 'app-documents-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']

})
export class DocumentComponent implements OnInit {

  lines: Line[]
  document$: Observable<Document>
  selected: string

  constructor (
    public documentsRepo: DocumentsRepo,
    public linesRepo: LinesRepo,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return

      this.document$ = this.documentsRepo.one$(this.selected)
      this.lines = await this.linesRepo.all().then(lines => lines.filter(line => line.document === this.selected))
    })
  }

  async addLine () {
    await this.linesRepo.addLine(this.selected)
  }
}
