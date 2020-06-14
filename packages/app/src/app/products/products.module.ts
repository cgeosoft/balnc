import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ShellComponent } from './@shell/shell.component'
import { OverviewComponent } from './overview/overview.component'
import { ProductCreateComponent } from './product-create/product-create.component'
import { ProductViewComponent } from './product-view/product-view.component'

@NgModule({
  declarations: [
    ShellComponent,
    OverviewComponent,
    ProductViewComponent,
    ProductCreateComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: 'Products' },
        component: ShellComponent,
        children: [
          {
            path: 'overview',
            component: OverviewComponent
          },
          {
            path: 'create',
            data: { title: 'Create Product' },
            component: ProductCreateComponent
          },
          {
            path: ':id',
            data: { title: 'Product' },
            component: ProductViewComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'overview'
          }
        ]
      }
    ])
  ]
})
export class ProductsModule { }
