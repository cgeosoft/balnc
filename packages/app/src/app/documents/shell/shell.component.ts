import { Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { DocumentsService } from '../_shared/documents.service'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  documents$: Observable<Document[]>

  nickname: string

  constructor (
    private documentService: DocumentsService,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.documents$ = this.documentService.getAll$<Document>('documents')
  }

  async create (name) {
    if (!name) return
    const id = await this.documentService.createDocument(name)
    name = null
    await this.router.navigate(['/documents', id])
  }
}
