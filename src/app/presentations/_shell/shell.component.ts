import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CreateComponent } from '../create/create.component'
import { RxPresentationDoc } from '../_shared/models/presentation'
import { PresentationsService } from '../_shared/services/presentations.service'

@Component({
  selector: 'app-presentations-shell',
  templateUrl: './shell.component.html',
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  presentations: RxPresentationDoc[] = []

  constructor(
    private modal: NgbModal,
    public presentationsService: PresentationsService,
    private router: Router
  ) { }

  async ngOnInit() {
    const presentations = await this.presentationsService.getPresentations()
    return this.presentations = presentations
  }

  async create() {
    const modal = this.modal.open(CreateComponent, { size: 'sm' })
    const presentation = await modal.result
    await this.ngOnInit()
    await this.router.navigate(['/presentations', presentation.get('_id')])
  }

}
