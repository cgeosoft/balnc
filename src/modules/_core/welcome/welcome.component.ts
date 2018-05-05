import { Router } from '@angular/router';
import { Component } from '@angular/core'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

  constructor(
    private router: Router
  ) { }

  Ok() {
    localStorage.setItem("welcomeShown", "OK")
    this.router.navigate(["profiles"])
  }
}
