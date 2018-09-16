export type Profile = {
  id?: string
  name?: string
  createdAt?: string
  remoteHost?: string
  remoteUsername?: string
  remotePassword?: string
  remoteSync?: boolean
  packages?: { [key: string]: boolean }
  config?: any
}
