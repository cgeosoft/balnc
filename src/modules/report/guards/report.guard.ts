import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { ReportService } from '@balnc/report/services/report.service';
import { ConfigService } from '@balnc/common/services/config.service';
import { ReportConfig } from '@balnc/report/data/module-config';

@Injectable()
export class ReportGuard implements CanActivate {
  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  canActivate() {
    const userExists = localStorage.getItem("@balnc/report/report-user")
    const requireUser = (this.configService.getModuleConfig("@balnc/report") as ReportConfig).server.requireUser
    if (!userExists && requireUser) {
      this.router.navigate(["/report/login"])
      return false
    }
    return true
  }
}
