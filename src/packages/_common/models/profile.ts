export type Profile = {
  alias?: string
  name?: string
  key?: string
  createdAt?: string
  remotePrefix?: string
  remoteHost?: string
  remoteUsername?: string
  remotePassword?: string
  remoteSync?: boolean
  packages?: { [key: string]: boolean }
  config?: any
}
