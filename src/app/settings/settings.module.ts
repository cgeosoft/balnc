import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { GeneralComponent } from './general/general.component';
import { PluginsComponent } from './plugins/plugins.component';
import { RemoteComponent } from './remote/remote.component';
import { SettingsRoutes } from './settings.routes';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    DataComponent,
    PluginsComponent,
    AboutComponent,
    RemoteComponent,
  ],
  providers: [],
  entryComponents: [
    RemoteComponent,
  ]
})
export class SettingsModule { }
