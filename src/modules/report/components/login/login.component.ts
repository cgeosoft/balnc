import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'

import * as _ from 'lodash'
import * as moment from 'moment'

import { ConfigService } from '@balnc/common/services/config.service'
import { ReportService } from '@balnc/report/services/report.service'

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
    this.router.navigate(["/report/view/overview"])
  }
}
