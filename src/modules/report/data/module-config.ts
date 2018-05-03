import { BalanceModuleConfig } from "@blnc/common/models/module-config";

declare interface ReportConfigType {
  server: ReportServerConfigType
}

declare interface ReportServerConfigType {
  requireUser: boolean,
  host: string
}

export type ReportConfig = ReportConfigType & BalanceModuleConfig
export type ReportServerConfig = ReportServerConfigType
