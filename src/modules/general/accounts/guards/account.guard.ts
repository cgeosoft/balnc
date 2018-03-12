import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

@Injectable()
export class DefaultAccountGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate() {
    const account = localStorage.getItem("account")
    if (account) {
      return true
    }

    this.router.navigate(['/manage'])
    return false
  }
}
