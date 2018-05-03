import { ConfigService } from './../../../common/services/config.service'
import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'
import * as moment from 'moment'
import { ReportService } from '@blnc/report/services/report.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-reports-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup
  config: any

  constructor(
    private reportService: ReportService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ["", []],
      password: ["", []],
    })
  }

  onSubmit() {
    const formModel = this.form.value
    this.reportService.login(formModel.username, formModel.password)
    this.reportService.isAuthenticated.next(true)
    this.router.navigate(["reports", "view", "overview"])
  }
}
