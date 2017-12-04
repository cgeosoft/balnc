import { BehaviorSubject } from 'rxjs/Rx';

export class Entity {
  name: string
  schema: any
  sync: boolean
  ready: BehaviorSubject<boolean>
}
