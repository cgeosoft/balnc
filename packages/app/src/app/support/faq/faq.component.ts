import { Component, OnInit } from '@angular/core'
import * as faker from 'faker'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {
  questions = []
  ngOnInit (): void {
    for (let i = 0; i < 100; i++) {
      this.questions.push(
        {
          question: faker.hacker.phrase() + '?',
          answer: faker.lorem.paragraph()
        }
      )
    }
  }
}
