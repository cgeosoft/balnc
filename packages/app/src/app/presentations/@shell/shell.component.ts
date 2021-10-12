import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Presentation } from '../@shared/models/presentation'
import { PresentationsRepo } from '../@shared/repos/presentations.repo'
import { CreateComponent } from '../create/create.component'

@Component({
  selector: 'app-presentations-shell',
  templateUrl: './shell.component.html'

})
export class ShellComponent implements OnInit {

  pinned$: Observable<Presentation[]>

  constructor (
    private modal: NgbModal,
    private presentationsRepo: PresentationsRepo,
    private router: Router
  ) { }

  async ngOnInit () {
    this.pinned$ = this.presentationsRepo.all$().pipe(
      map((presentations) => presentations.filter(p => p.pinned))
    )
  }

  async create () {
    const modal = this.modal.open(CreateComponent, { size: 'sm' })
    const presentation = await modal.result
    await this.ngOnInit()
    await this.router.navigate(['/presentations', presentation.get('id')])
  }

}
