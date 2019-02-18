import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@balnc/shared';

@Component({
  selector: 'app-restaurants-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class RestaurantsClientComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }
}

const routes: Routes = [{
  path: 'restaurants-client',
  component: RestaurantsClientComponent
}]

@NgModule({
  imports: [
    SharedModule,
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
