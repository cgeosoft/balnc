import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Product } from './product'

@Injectable({
  providedIn: 'root'
})
export class ProductsRepo extends Repository<Product> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'products.product'
  }

}
