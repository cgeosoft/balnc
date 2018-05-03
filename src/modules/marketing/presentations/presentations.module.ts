import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router'

import { FileUploadModule } from 'ng2-file-upload';
import { PresentationsService } from '@blnc/marketing/presentations/services/presentations.service';
import { ItemComponent } from '@blnc/marketing/presentations/components/item/item.component';
import { CreatePresentationComponent } from '@blnc/marketing/presentations/components/create-presentation/create-presentation.component';
import { UploadComponent } from '@blnc/marketing/presentations/components/upload/upload.component';
import { AddPageComponent } from '@blnc/marketing/presentations/components/add-page/add-page.component';
import { OverviewComponent } from '@blnc/marketing/presentations/components/overview/overview.component';

const routes: Routes = [{
  path: 'presentations',
  resolve: {
    service: PresentationsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: ':id', component: ItemComponent },
    { path: '', redirectTo: "overview" },
  ]
}]

@NgModule({
  declarations: [
    OverviewComponent,
    ItemComponent,
    CreatePresentationComponent,
    UploadComponent,
    AddPageComponent,
  ],
  imports: [
    FormsModule,
    FileUploadModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    PresentationsService
  ],
  entryComponents: [
    CreatePresentationComponent,
    UploadComponent,
    AddPageComponent,
  ]
})
export class PresentationsModule { }
