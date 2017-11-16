import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
]

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes)
    ],
})
export class AccountsModule { }
