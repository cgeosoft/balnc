import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ReportComponent } from './components/report/report.component'
import { ReportService } from './report.service'

export const ReportsRoutes = [{
  path: '',
  component: WrapperComponent,
  resolve: {
    srv: ReportService
  },
  children: [
    { path: '', component: OverviewComponent },
    { path: ':id', component: ReportComponent }
  ]
}]
