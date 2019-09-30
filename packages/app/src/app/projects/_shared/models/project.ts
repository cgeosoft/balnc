import { RxDocument } from 'rxdb'

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
  status?: IssueStatus
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
  issueId: string
  text?: string
  type: LogType
}

export enum IssueType {
  issue = 'TASK',
  story = 'STORY',
  bug = 'BUG',
  support = 'SUPPORT'
}

export enum IssueStatus {
  open = 'OPEN',
  pending = 'PENDING',
  progress = 'PROGRESS',
  completed = 'COMPLETED',
  review = 'REVIEW',
  closed = 'CLOSED'
}

export enum LogType {
  activity = 'ACTIVITY',
  work = 'WORK',
  comment = 'COMMENT'
}

export const IssueTypeModel = [
  { alias: 'issue', color: '#f00' },
  { alias: 'story', color: '#f00' },
  { alias: 'bug', color: '#f00' },
  { alias: 'support', color: '#f00' }
]

export const IssueStatuses = [
  { key: IssueStatus.open, alias: 'Open', color: '#9E9E9E' },
  { key: IssueStatus.pending, alias: 'Pending', color: '#607D8B' },
  { key: IssueStatus.progress, alias: 'Progress', color: '#FF5722' },
  { key: IssueStatus.completed, alias: 'Completed', color: '#2196F3' },
  { key: IssueStatus.review, alias: 'Review', color: '#9C27B0' },
  { key: IssueStatus.closed, alias: 'Closed', color: '#4CAF50' }
]

export type RxProjectDoc = RxDocument<Project> & Project
export type RxIssueDoc = RxDocument<Issue> & Issue
export type RxLogDoc = RxDocument<Log> & Log
