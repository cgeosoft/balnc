import { Component, NgZone, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Document } from '../_shared/models/document'
import { Line } from '../_shared/models/line'
import { DocumentsRepo } from '../_shared/repos/documents.repo'
import { LinesRepo } from '../_shared/repos/lines.repo'

@Component({
  selector: 'app-documents-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  host: { 'class': 'page' }
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
