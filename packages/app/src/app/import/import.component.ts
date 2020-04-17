import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigService } from '../@core/services/config.service'
import { RxDBService } from '../@core/services/rxdb.service'
import { DEFAULT_WORKSPACE } from '../@shared/models/workspace'

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  loading = false
  config

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
    private configService: ConfigService
  ) { }

  ngOnInit (): void {
    this.route.queryParams.subscribe((params) => {
      this.config = JSON.parse(atob(params['d']))
    })
  }

  async start () {
    this.loading = true
    const key = this.configService.save({ ...DEFAULT_WORKSPACE })
    this.configService.activated = key
    this.configService.setup()
    await this.dbService.setup()
    await this.dbService.updateIntergration('server', this.config)
    await this.router.navigateByUrl('/')
  }

}
