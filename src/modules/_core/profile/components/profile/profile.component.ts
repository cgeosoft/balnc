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
    profileEdit: Profile
    profileName: string;
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

        this.setup()

        this.route.params.subscribe(params => {
            this.setup(params['alias'])
        })
    }

    setup(alias: string = null) {
        if (alias) {
            const profile = this.profileService.get(alias)
            this.profileName = profile.name
            this.profileEdit = { ...profile }
            this.profileEdit.remote = this.profileEdit.remote || {}
            this.activeModules = Object.keys(profile.modules).reduce((x, i) => {
                x[i] = profile.modules[i].enabled
                return x
            }, {})
        } else {
            this.profileName = "New Profile"
            this.profileEdit = {
                alias: "",
                remote: {},
                modules: [],
                name: "",
            }
        }
    }

    save() {
        const alias = this.profileService.save(this.profileEdit)
        if (this.profileEdit.alias) {
            this.router.navigate(['/profile', alias])
        }
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

    delete() {
        this.profileService.delete(this.profileEdit.alias)
        this.router.navigate(['/profiles'])
    }

}
