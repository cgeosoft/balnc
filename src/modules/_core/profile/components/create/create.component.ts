import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxDocumentBase } from 'rxdb';
import { Observable } from 'rxjs/Observable';

import { ProfileService } from '../../services/profile.service';
import { RxProfileDocument } from '../../data/profile';

@Component({
    selector: 'app-profile-create',
    templateUrl: './create.component.html',
})
export class CreateProfileComponent implements OnInit {

    @ViewChild("name") name: ElementRef;
    @ViewChild("alias") alias: ElementRef;

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private profileService: ProfileService,
    ) { }

    async ngOnInit() {
        this.form = this.formBuilder.group({
            alias: ["", [Validators.required, Validators.maxLength(50)]],
            name: ["", [Validators.required, Validators.maxLength(100)]],
        });
    }

    onSubmit() {
        const formModel = this.form.value;
        const profileId = formModel.profile
        this.profileService
            .addProfile(formModel.alias, formModel.name)
            .then(() => {
                this.activeModal.close()
            })
    }
}
