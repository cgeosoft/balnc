import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['statusbar.component.scss']
})
export class StatusbarComponent implements OnInit {

  breadcrumbs = []
  constructor (
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private config: ConfigService
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
    if (child.snapshot.data.breadcrumb) {
      breadcrumbs.push({ label: child.snapshot.data.breadcrumb.label, url })
    }

    return this.createBreadcrumbs(child, url, breadcrumbs)
  }
  get version () {
    return this.configService.version
  }

  get profile () {
    return this.configService.profile
  }

  toggleLayout (layout) {
    const profile = { ...this.configService.profile }
    profile.layout = layout
    this.configService.saveProfile(profile)
  }
}
