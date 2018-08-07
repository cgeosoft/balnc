import { RxDocument } from 'rxdb'

import * as _PersonSchema from './person.json'

export interface Person {
  name: string
  avatar?: string
  phones?: string[]
  emails?: string[]
  socials?: string[]
  details?: any
}
export type RxPersonDocument = RxDocument<Person> & Person
export const PersonSchema = _PersonSchema
