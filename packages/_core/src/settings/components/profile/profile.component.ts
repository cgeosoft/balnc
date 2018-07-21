import { Router, ActivatedRoute } from '@angular/router'
import { reduce } from 'rxjs/operators'
import { Component, Input, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { RxDocumentBase } from 'rxdb'
import { Observable } from 'rxjs'

import * as _ from 'lodash'

import { BalncModule, DatabaseService, ConfigService, Profile } from '@balnc/common'

@Component({
    selector: 'core-settings-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

    @ViewChild("name") name: ElementRef
    @ViewChild("alias") alias: ElementRef

    modules: BalncModule[]
    activeModules: any = {}
    profileEdit: Profile
    profileName: string
    form: FormGroup
    deleteData = false
    deleteDataRemote = false

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
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
            const profile = this.configService.getProfile(alias)
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
        // const alias = this.configService.saveProfile(this.profileEdit)
        if (this.profileEdit.alias) {
            this.router.navigate(['/profile', this.profileEdit.alias])
        }
    }

    async backup() {
        const data = await this.databaseService.backup()

        const a = document.createElement("a")
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
        a.href = URL.createObjectURL(file)
        a.download = `data-${(new Date).getTime()}.json`
        a.click()
    }

    restore() { }

    delete() {
        // this.configService.deleteProfile(this.profileEdit.alias)
        this.router.navigate(['/profiles'])
    }

    activate(alias: string) {
        this.configService.selectProfile(alias)
        //   this.selectedProfile = this.configService.getCurrent()
        //   this.router.navigate(['dashboard'])
    }

}
