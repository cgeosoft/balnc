import { BalncModuleConfig } from "@balnc/common/models/module-config";

declare interface ReportConfigType {
  server: ReportServerConfigType
}

declare interface ReportServerConfigType {
  requireUser: boolean,
  host: string
}

export type ReportConfig = ReportConfigType & BalncModuleConfig
export type ReportServerConfig = ReportServerConfigType
