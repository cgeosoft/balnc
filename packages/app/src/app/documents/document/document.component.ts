import { Component, NgZone, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { DocumentsService } from '../_shared/documents.service'
import { Line } from '../_shared/models/entities'

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
    public documentService: DocumentsService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return

      this.document$ = this.documentService.getOne$<Document>('documents', this.selected)
      this.lines = await this.documentService.getAll<Line>('lines').then(lines => lines.filter(line => line.document === this.selected))
      //   .pipe(
      //   ,
      //   tap(lines => {
      //     lines
      //   })
      // )
    })
  }

  async addLine () {
    await this.documentService.addLine(this.selected)
  }
}
