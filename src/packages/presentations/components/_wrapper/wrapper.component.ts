import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { PresentationsService } from '../../presentations.service'
import { Presentation } from '../../models/presentation'
import { CreateComponent } from '../create/create.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'presentations-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  presentations: Presentation[] = []

  constructor (
    private modal: NgbModal,
    public presentationsService: PresentationsService,
    private router: Router
  ) { }

  async ngOnInit () {
    await this.presentationsService.setup()
    this.presentations = await this.presentationsService.getPresentations()
  }

  async create () {
    const presentation = await this.modal.open(CreateComponent).result
    this.ngOnInit()
    this.router.navigate(['/presentations', presentation._id])
  }

}
