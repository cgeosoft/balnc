import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'

import { ProfileService } from '../../services/profile.service'
import { ConfigService } from '@blnc/common/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '@blnc/core/profile/data/profile';

@Component({
    selector: 'app-profile-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    @ViewChild("name") name: ElementRef
    @ViewChild("alias") alias: ElementRef

    profileEdit: any
    profile: Profile
    form: FormGroup

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private configService: ConfigService,
    ) { }

    async ngOnInit() {
        // this.generateModuleList()
        this.route.params.subscribe(params => {
            this.setup(params['alias'])
        })
        this.profileEdit = { ...this.profile }
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

    // generateModuleList() {
    //     this.namespaces = _.chain(this.configService.modules)
    //         .groupBy("namespace")
    //         .map((modules, namespace) => {
    //             let ns = _.find(this.configService.namespaces, i => {
    //                 return i.id === namespace
    //             })

    //             if (!ns) {
    //                 ns = {
    //                     id: "?",
    //                     title: "?",
    //                 }
    //             }

    //             ns.modules = modules
    //             return ns
    //         })
    //         .value()
    // }

}
