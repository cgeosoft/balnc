import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxDocumentBase } from 'rxdb';
import { Observable } from 'rxjs/Observable';

import { AccountsService } from '../../services/accounts.service';
import { RxAccountDocument } from '../../data/account';

@Component({
    selector: 'app-team-accounts-account-create',
    templateUrl: './create-account.component.html',
})
export class CreateAccountComponent implements OnInit {

    @ViewChild("title") title: ElementRef;
    @ViewChild("alias") alias: ElementRef;

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private accountsService: AccountsService,
    ) { }

    async ngOnInit() {
        this.form = this.formBuilder.group({
            alias: ["", [Validators.required, Validators.maxLength(100)]],
            title: ["", [Validators.required, Validators.maxLength(100)]],
        });
    }

    onSubmit() {
        const formModel = this.form.value;
        const accountId = formModel.account
        this.accountsService
            .addAccount(formModel.alias, formModel.title)
            .then(() => {
                this.form.reset()
                this.form.get("account").setValue(accountId)
                this.title.nativeElement.focus()
            })
    }
}
