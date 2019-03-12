import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PresentationsService } from '../../presentations.service';


@Component({
  selector: 'app-presentations-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  presentations: any[] = null

  constructor (
    private modal: NgbModal,
    private presentationsService: PresentationsService
  ) { }

  ngOnInit () {
    this.load()
  }

  async load () {
    this.presentations = await this.presentationsService.getPresentations()
  }

  async create () {
    // await this.modal.open(CreatePresentationComponent).result
    this.load()
  }
}
