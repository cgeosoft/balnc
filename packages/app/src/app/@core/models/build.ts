export interface Build {
  timestamp: number
  git: {
    hash: string
    date: string
    branch: string
  }
}
