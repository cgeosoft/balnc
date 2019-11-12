import { OverviewComponent } from './components/overview/overview.component'
import { ReportComponent } from './components/report/report.component'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { ReportsService } from './reports.service'

export const ReportsRoutes = [{
  path: '',
  component: WrapperComponent,
  resolve: {
    srv: ReportsService
  },
  children: [
    { path: '', component: OverviewComponent },
    { path: ':id', component: ReportComponent }
  ]
}]
