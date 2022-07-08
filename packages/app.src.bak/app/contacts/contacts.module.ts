import { NgModule } from '@angular/core'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ContactsRepo } from './@shared/contacts.repo'
import { ShellComponent } from './@shell/shell.component'
import { ContactCreateComponent } from './contact-create/contact-create.component'
import { ContactManageComponent } from './contact-manage/contact-manage.component'
import { ContactTimelineComponent } from './contact-timeline/contact-timeline.component'
import { ContactComponent } from './contact/contact.component'
import { ContactsComponent } from './contacts/contacts.component'

const ROUTES = [{
  path: '',
  data: {
    title: false
  },
  component: ShellComponent,
  children: [{
    path: 'overview',
    data: {
      title: 'Overview'
    },
    component: ContactsComponent
  }, {
    path: 'contact/:id',
    resolve: {
      title: 'contactTitleResolver'
    },
    component: ContactComponent,
    children: [{
      path: 'timeline',
      data: {
        title: 'Timeline'
      },
      component: ContactTimelineComponent
    }, {
      path: 'manage',
      data: {
        title: 'Manage'
      },
      component: ContactManageComponent
    }, {
      path: '', redirectTo: 'timeline', pathMatch: 'full'
    }]
  }, {
    path: '', redirectTo: 'overview', pathMatch: 'full'
  }]
}]

@NgModule({
  declarations: [
    ShellComponent,
    ContactsComponent,
    ContactComponent,
    ContactCreateComponent,
    ContactManageComponent,
    ContactTimelineComponent
  ],
  entryComponents: [
    ContactCreateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {
      provide: 'contactTitleResolver',
      useFactory: (repo: ContactsRepo) => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => repo.one(route.paramMap.get('id')).then(contact => contact.name),
      deps: [ContactsRepo]
    }
  ]
})
export class ContactsModule { }
