import { RxDocument } from 'rxdb'

export interface Project {
  name: string
  description: string
  features: { [key: string]: boolean }
  tags: any[]
  isStarred: boolean
  isArchived: boolean
}

export type RxProjectDoc = RxDocument<Project> & Project
