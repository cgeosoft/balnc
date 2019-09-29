import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import { CreateComponent } from '../create/create.component'
import { Presentation } from '../_shared/models/presentation'
import { PresentationsService } from '../_shared/services/presentations.service'

@Component({
  selector: 'app-presentations-shell',
  templateUrl: './shell.component.html',
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  presentations$: Observable<Presentation[]>

  constructor(
    private modal: NgbModal,
    public presentationsService: PresentationsService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.presentations$ = this.presentationsService.getAll$<Presentation>('presentations')
  }

  async create() {
    const modal = this.modal.open(CreateComponent, { size: 'sm' })
    const presentation = await modal.result
    await this.ngOnInit()
    await this.router.navigate(['/presentations', presentation.get('_id')])
  }

}
