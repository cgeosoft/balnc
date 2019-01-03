import { NgModule,Component,OnInit } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'

@Component({
  selector: 'app-restaurants-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class RestaurantsClientComponent implements OnInit {

  constructor (
    ) { }

  ngOnInit () {
  }
}

const routes: Routes = [{
  path: 'restaurants-client',
  component: RestaurantsClientComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    RestaurantsClientComponent
  ],
  providers: [
  ],
  entryComponents: []
})
export class RestaurantsModule { }
