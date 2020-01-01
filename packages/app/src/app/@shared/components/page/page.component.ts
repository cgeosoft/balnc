import { Component, Input } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['page.component.scss']
})
export class PageComponent {
  @Input() breadcrumb: boolean = false
  @Input() menu = null
  @Input() search = null

  breadcrumbs = []

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private config: ConfigService
  ) {
  }

  get layout () {
    return this.config.profile.layout
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
    console.log(route,child.snapshot.data.breadcrumb)
    if (child.snapshot.data.breadcrumb) {
      breadcrumbs.push({ label: child.snapshot.data.breadcrumb.label, url })
    }

    return this.createBreadcrumbs(child, url, breadcrumbs)
  }

}
