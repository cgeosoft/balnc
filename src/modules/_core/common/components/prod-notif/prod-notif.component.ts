import { Component, Input, OnInit, NgZone } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-common-prod-notif',
    templateUrl: './prod-notif.component.html'
})
export class ProdNotifComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal,
    ) { }

    async ngOnInit() {
    }
}
