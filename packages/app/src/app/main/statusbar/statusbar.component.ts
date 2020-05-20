import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { filter } from 'rxjs/operators'
import { ChangelogComponent } from '../changelog/changelog.component'

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['statusbar.component.scss']
})
export class StatusbarComponent implements OnInit {

  breadcrumbs: { url: string, label: string }[] = []

  get version () {
    return this.configService.version
  }

  get user () {
    return this.configService.user
  }

  get build () {
    return this.configService.build
  }

  get workspace () {
    return this.configService.workspace
  }

  get dbStatus$ () {
    return this.dbService.status$
  }

  constructor (
    private configService: ConfigService,
    private dbService: RxDBService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {
  }

  ngOnInit () {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root))
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root)
  }

  openChangelog () {
    this.modal.open(ChangelogComponent, { size: 'lg', centered: true, scrollable: true })
  }

  private createBreadcrumbs (route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {

    if (route.children.length === 0) {
      return breadcrumbs
    }

    const child = route.firstChild
    const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')
    if (routeURL !== '') {
      url += `/${routeURL}`

    }

    if (child.snapshot.data.title) {
      breadcrumbs.push({ label: child.snapshot.data.title, url })
    }

    return this.createBreadcrumbs(child, url, breadcrumbs)
  }
}
