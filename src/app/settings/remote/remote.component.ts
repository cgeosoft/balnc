import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '@balnc/core';
import { Profile } from '@balnc/shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html',
})
export class RemoteComponent implements OnInit {

  @Input() profile: Profile

  remote: {
    enabled: boolean;
    host?: string;
    username?: string;
    password?: string;
  };

  profiles: { key: string }[] = []

  wizard = {
    active: "host",
    steps: [
      { key: "host", label: 'host' },
      { key: "auth", label: 'authentication' },
      { key: "profile", label: 'link profile' },
      { key: "finish", label: 'finish' }
    ]
  }
  isDemo = false

  loading = {
    verifing: false,
    auth: false,
  }

  authView = 'login'

  constructor(
    private http: HttpClient,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.remote = {
      ...this.profile.remote,
      ...{
        host: "",
        username: "",
        password: ""
      }
    }
  }

  save() {
    this.activeModal.close(this.remote)
  }

  dismiss() {
    this.activeModal.dismiss()
  }

  demo() {
    this.verify(environment.db)
  }

  verify(host) {
    this.loading.verifing = true
    this.isDemo = false
    const _host = host.trim().replace(/\/$/, "")
    if (_host === environment.db)
      this.isDemo = true
    return this.http
      .get(_host)
      .toPromise()
      .then((result) => {
        this.remote.host = _host
        this.wizard.active = 'auth'
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
      .finally(() => {
        this.loading.verifing = false
      })
  }

  register(username, password) {
    this.loading.auth = true
    const _username = username.trim()
    const _password = password.trim()
    return this.http
      .post(`${environment.funcs}/register`, {
        username: _username,
        password: _password,
      })
      .toPromise()
      .then(() => {
        this.login(_username, _password)
      })
      .catch((response) => {
        this.toastr.error(response.error.reason)
      })
      .finally(() => {
        this.loading.auth = false
      })
  }

  login(username, password) {
    this.loading.auth = true
    const _username = username.trim()
    const _password = password.trim()

    return this.http
      .post(`${this.remote.host}/_session`,
        `name=${_username}&password=${_password}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      .toPromise()
      .then((response: { roles: string[] }) => {
        this.profiles = response.roles
          .filter((r) => r.indexOf("members_") === 0)
          .map(r => {
            return {
              key: r
            }
          })
        this.remote.username = _username
        this.remote.password = _password
        this.wizard.active = 'profile'
      })
      .catch((response) => {
        this.toastr.error(response.error.reason)
      })
      .finally(() => {
        this.loading.auth = false
      })
    }
}
