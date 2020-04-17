import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigService, DEFAULT_WORKSPACE, IntegrationsRepo, RxDBService, ServerIntegration } from '@balnc/core'

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  loading = false
  config: any
  username: string

  get version () {
    return this.configService.version
  }

  get build () {
    return this.configService.build
  }

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dbService: RxDBService,
    private configService: ConfigService,
    private integrationRepo: IntegrationsRepo
  ) { }

  ngOnInit (): void {
    this.route.queryParams.subscribe((params) => {
      this.config = JSON.parse(atob(params['d']))
    })
  }

  async start () {
    this.loading = true
    const key = this.configService.save({ ...DEFAULT_WORKSPACE })
    this.configService.username = this.username
    this.configService.activated = key
    await this.dbService.setup()
    const config: Partial<ServerIntegration> = {
      enabled: true,
      host: this.config.h,
      dbEnable: true,
      dbName: this.config.d
    }
    await this.integrationRepo.add(config, 'server')
    await this.router.navigateByUrl('/')
  }

}
