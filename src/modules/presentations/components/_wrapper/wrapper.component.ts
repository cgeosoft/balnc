import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { PresentationDoc } from '../../models/presentation'
import { PresentationsService } from '../../presentations.service'
import { CreateComponent } from '../create/create.component'

@Component({
  selector: 'presentations-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  presentations: PresentationDoc[] = []

  constructor (
    private modal: NgbModal,
    public presentationsService: PresentationsService,
    private router: Router
  ) { }

  async ngOnInit () {
    this.presentations = await this.presentationsService.getPresentations()
  }

  async create () {
    this.modal.open(CreateComponent, {
      size: 'sm'
    }).result
      .then((presentation: PresentationDoc) => {
        this.ngOnInit()
        this.router
          .navigate(['/presentations', presentation.get('_id')])
      })
  }

}
