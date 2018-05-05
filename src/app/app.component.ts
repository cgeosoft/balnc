import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(
    private router: Router
  ) {
    console.log(this.router.config);
  }
}
