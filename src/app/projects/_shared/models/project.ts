import { RxDocument } from 'rxdb';

export interface Project {
  name: string
  description?: string
  features?: { [key: string]: boolean }
  tags?: any[]
  isStarred?: boolean
  isArchived?: boolean
}

export interface Meta {
  insertedAt: number
  insertedFrom: string
  updatedAt?: number
  updatedFrom?: string
}

export interface Issue extends Meta {
  projectId: string
  type: IssueType
  title: string
  description?: string
  parent?: string
  status?: string
  assignee?: string
  reporter?: string
  branch?: string
  labels?: string[]
  estimate?: number
  time?: number
  priority?: number
  dueDate?: number
}

export interface Log extends Meta {
  taskId: string
  text?: string
  type: LogType
}

export enum IssueType {
  Task = "TASK",
  Story = "STORY",
  Bug = "BUG",
  Support = "SUPPORT",
}

export enum LogType {
  Activity = "ACTIVITY",
  Work = "WORK",
  Comment = "COMMENT",
}

export const IssueTypeModel = [
  { alias: "Task", color: "#f00" },
  { alias: "Story", color: "#f00" },
  { alias: "Bug", color: "#f00" },
  { alias: "Support", color: "#f00" }
]

export type RxProjectDoc = RxDocument<Project> & Project
export type RxIssueDoc = RxDocument<Issue> & Issue
export type RxLogDoc = RxDocument<Log> & Log
