import { Component } from '@angular/core'
import { SessionStorage } from 'ngx-store'
import { Router } from '@angular/router'

@Component({
  selector: 'common-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  @SessionStorage() error = ''

  constructor (private router: Router) { }

  clear () {
    let keys = Object.keys(localStorage)
    let i = keys.length
    while (i--) {
      indexedDB.deleteDatabase(keys[i])
    }
    localStorage.clear()
    this.router.navigate(['/setup'])
  }
}
