import { ConfigService } from './../config/config.service';
import { BalanceModule } from './../config/models/balance-module';
import { BalanceNamespace } from './../config/models/balance-namespace';
import { Component, OnDestroy, OnInit } from '@angular/core'

import * as _ from 'lodash'

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
  ) { }

  ngOnInit() {

    this.namespaces = _.chain(ConfigService.modules)
      .groupBy("namespace")
      .map((modules, namespace) => {
        let ns = _.find(ConfigService.namespaces, i => {
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
