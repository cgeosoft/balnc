import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Helpers, MenuItem } from '@balnc/shared'
import { ProductsRepo } from '../@shared/contacts.repo'

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  menu: MenuItem[] = [{
    label: 'Create Product',
    type: 'button',
    highlight: true,
    icon: 'plus-circle',
    action: () => {
      return this.create()
    }
  }, {
    label: 'Overview',
    type: 'button',
    icon: 'border-all',
    route: ['/contacts/overview']
  }]

  constructor (
    private productsRepo: ProductsRepo,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  async create () {
    console.log('create board')
    const product = await this.productsRepo.add({
      name: Helpers.generateName()
    })
    await this.router.navigate(['/products', product._id])
  }
}
