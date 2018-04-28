import { ConfigService } from './../../../core/common/services/config.service'
import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection, RxDocumentBase } from 'rxdb'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'
import * as moment from 'moment'
import { ReportService } from '@blnc/reports/services/report.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-reports-auth',
  templateUrl: 'auth.component.html',
})
export class AuthComponent implements OnInit {

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
    this.reportService.user = {
      username: formModel.username,
      password: formModel.password,
    }
    this.reportService.isAuthenticated.next(true)
    this.router.navigate(["reports/overview"])
  }
}
