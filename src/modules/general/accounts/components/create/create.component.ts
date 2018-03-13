import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxDocumentBase } from 'rxdb';
import { Observable } from 'rxjs/Observable';

import { AccountsService } from '../../services/accounts.service';
import { RxAccountDocument } from '../../data/account';

@Component({
    selector: 'app-accounts-create',
    templateUrl: './create.component.html',
})
export class CreateAccountComponent implements OnInit {

    @ViewChild("name") name: ElementRef;
    @ViewChild("alias") alias: ElementRef;

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private accountsService: AccountsService,
    ) { }

    async ngOnInit() {
        this.form = this.formBuilder.group({
            alias: ["", [Validators.required, Validators.maxLength(50)]],
            name: ["", [Validators.required, Validators.maxLength(100)]],
        });
    }

    onSubmit() {
        const formModel = this.form.value;
        const accountId = formModel.account
        this.accountsService
            .addAccount(formModel.alias, formModel.name)
            .then(() => {
                this.activeModal.close()
            })
    }
}
