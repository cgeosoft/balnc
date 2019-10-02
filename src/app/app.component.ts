import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet><script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="5978eab8-71b3-413d-9963-67a946a97ca5";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`
})
export class AppComponent {

  constructor (
    private router: Router
  ) {
    console.log('Routes', this.router.config)
  }
}
