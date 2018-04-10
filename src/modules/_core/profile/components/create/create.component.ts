import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'

import { ProfileService } from '../../services/profile.service'

@Component({
    selector: 'app-profile-create',
    templateUrl: './create.component.html',
})
export class CreateProfileComponent implements OnInit {

    @ViewChild("name") name: ElementRef
    @ViewChild("alias") alias: ElementRef

    form: FormGroup

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
    ) { }

    async ngOnInit() {
        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.maxLength(50)]],
        })
    }

    onSubmit() {
        const formModel = this.form.value
        const profileId = formModel.profile
        ProfileService.addProfile({
            alias: formModel.name
        })
        // this.profileService
        //     .addProfile(formModel.alias, formModel.name)
        //     .then(() => {
        //         this.activeModal.close()
        //     })
    }
}
