import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '../../_core/common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    // DatabaseModule.forChild(entities),
    RouterModule.forChild(routes)
  ],
  declarations: [
    // ChatComponent
  ],
  providers: []
})
export class ProjectsModule { }
