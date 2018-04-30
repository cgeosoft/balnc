import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

@Injectable()
export class WelcomeGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate() {
    if (!localStorage.getItem("welcomeShown")) {
      this.router.navigate(["welcome"])
      return false
    }
    return true
  }
}
