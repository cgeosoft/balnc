import { reduce } from 'rxjs/operators/reduce';
import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'

import { ProfileService } from '../../services/profile.service'
import { ConfigService } from '@balnc/common/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '@balnc/core/profile/data/profile';
import { BalncModule } from '@balnc/common/models/balnc-module';
import { DatabaseService } from '@balnc/common/services/database.service';

@Component({
    selector: 'app-profile-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    @ViewChild("name") name: ElementRef
    @ViewChild("alias") alias: ElementRef

    modules: BalncModule[];
    activeModules: any = {}
    profileEdit: any
    profile: Profile
    form: FormGroup
    deleteData = false
    deleteDataRemote = false

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private configService: ConfigService,
        private databaseService: DatabaseService,
    ) { }

    async ngOnInit() {
        this.modules = this.configService.modules

        this.route.params.subscribe(params => {
            this.setup(params['alias'])
        })
        this.profileEdit = { ...this.profile }

        this.activeModules = Object.keys(this.profile.modules).reduce((x, i) => {
            x[i] = this.profile.modules[i].enabled
            return x
        }, {})
    }

    setup(alias) {
        if (alias) {
            this.profile = this.profileService.get(alias)
        }
        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.maxLength(50)]],
        })
    }

    onSubmit() {
        const formModel = this.form.value
        const profileId = formModel.profile
        this.profileService.add({
            alias: "",
            name: formModel.name
        })
        // this.profileService
        //     .addProfile(formModel.alias, formModel.name)
        //     .then(() => {
        //         this.activeModal.close()
        //     })
    }

    async backup() {
        const data = await this.databaseService.backup();

        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = `data-${(new Date).getTime()}.json`;
        a.click();
    }

    restore() { }

}
