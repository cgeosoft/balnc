import { Component, OnDestroy, OnInit } from '@angular/core'

import * as _ from 'lodash'

import { ConfigService } from '@blnc/core/common/services/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  menu = {
    active: "modules",
    items: [{
      id: "general",
      label: "General",
      icon: "cubes",
    }, {
      id: "modules",
      label: "Modules",
      icon: "cubes",
    }]
  }

  namespaces: any[] = []

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit() {

    this.namespaces = _.chain(this.configService.modules)
      .groupBy("namespace")
      .map((modules, namespace) => {
        let ns = _.find(this.configService.namespaces, i => {
          return i.id === namespace
        })

        if (!ns) {
          ns = {
            id: "?",
            title: "?",
          }
        }

        ns.modules = modules
        return ns
      })
      .value()
  }

  ngOnDestroy() {
  }
}
