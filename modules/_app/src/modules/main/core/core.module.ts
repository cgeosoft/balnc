import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CORE_ROUTES } from './core.routes';
import { MainComponent } from './components/main/main.component';

// export const CORE_ROUTES: Routes = [
//   {
//     path: '',
//     component: MainComponent,
//     children: MODS.map((item) => {
//       return {
//         path: item.root,
//         loadChildren: item.mod
//       }
//     })
//   },
//   { path: '**', redirectTo: '/invoices/report', pathMatch: 'full' },
// ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CORE_ROUTES)
  ],
  declarations: [
    MainComponent,
  ]
})
export class CoreModule { }
