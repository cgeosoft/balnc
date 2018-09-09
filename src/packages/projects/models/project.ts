import { RxDocument } from 'rxdb'

declare interface IProject {
  name: string
  description: string
  features: { [key: string]: boolean }
  tags: any[]
  isStarred: boolean
  isArchived: boolean
}

export type Project = IProject
export type RxProjectDoc = RxDocument<IProject> & IProject
