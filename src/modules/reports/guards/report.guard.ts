import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { ReportService } from '@blnc/reports/services/report.service';
import { ConfigService } from '@blnc/core/common/services/config.service';
import { ReportConfig } from '@blnc/reports/data/module-config';

@Injectable()
export class ReportGuard implements CanActivate {
  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  canActivate() {
    const userExists = localStorage.getItem("@blnc/reports/report-user")
    const requireUser = (this.configService.getModuleConfig("@blnc/reports") as ReportConfig).server.requireUser
    if (!userExists && requireUser) {
      this.router.navigate(["reports/login"])
      return false
    }
    return true
  }
}
