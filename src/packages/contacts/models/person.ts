import { RxDocument } from 'rxdb'

export interface Person {
  name: string
  avatar?: string
  phones?: string[]
  emails?: string[]
  socials?: string[]
  details?: any
  insertedAt: string
  updatedAt: string
}
export type RxPersonDocument = RxDocument<Person> & Person
