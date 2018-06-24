import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common';

import { DatabaseService } from '@balnc/common/services/database.service';

@Component({
    selector: 'app-profile-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    password: string;
    username: string;

    constructor(
        private location: Location,
        private databaseService: DatabaseService,
    ) { }

    ngOnInit() {
    }

    login() {
        this.databaseService.authenticate(this.username, this.password)
        this.location.back();
    }
}

