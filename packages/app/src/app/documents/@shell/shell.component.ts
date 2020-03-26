import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Document } from '../@shared/models/document'
import { DocumentsRepo } from '../@shared/repos/documents.repo'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']

})
export class ShellComponent implements OnInit {

  menu: MenuItem[] = [
    {
      label: 'Overview',
      type: 'button',
      icon: 'border-all',
      action: () => {
      }
    }
  ]

  documents$: Observable<Document[]>

  nickname: string

  constructor (
    private documentsRepo: DocumentsRepo,
    private router: Router
  ) { }

  ngOnInit () {
    this.documents$ = this.documentsRepo.all$()
  }

  async create (name) {
    if (!name) return
    const id = await this.documentsRepo.add({ name })
    name = null
    await this.router.navigate(['/documents', id])
  }
}
