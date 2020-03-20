import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
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
  status = 'disabled'
  constructor (
    private configService: ConfigService,
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

  private createBreadcrumbs (route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
    // console.log(route.children)
    if (route.children.length === 0) {
      return breadcrumbs
    }

    // for (const child of children)
    const child = route.firstChild
    const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/')
    if (routeURL !== '') {
      url += `/${routeURL}`

    }
    // console.log(route, child.snapshot.data.breadcrumb)
    if (child.snapshot.data.title) {
      breadcrumbs.push({ label: child.snapshot.data.title, url })
    }

    return this.createBreadcrumbs(child, url, breadcrumbs)
  }

  get version () {
    return this.configService.version
  }

  get username () {
    return this.configService.username || 'anon'
  }

  get build () {
    return this.configService.build
  }

  get profile () {
    return this.configService.profile
  }

  toggleLayout (layout) {
    const profile = { ...this.configService.profile }
    profile.layout = layout
    this.configService.save(profile)
  }

  openChangelog () {
    this.modal.open(ChangelogComponent, { size: 'lg', centered: true, scrollable: true })
  }
}
