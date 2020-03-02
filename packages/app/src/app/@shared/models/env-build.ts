export interface EnvBuild {
  timestamp: number
  git: {
    hash: string
    author: string
    date: string
    message: string
    branch: string
  }
}
