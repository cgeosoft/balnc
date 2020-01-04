import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

export enum Signal {
  GENERATE_DEMO_DATA
}

export interface SignalLog {
  date: number
  message: string
}

@Injectable()
export class SignalService {

  messages: SignalLog[] = []
  messages$ = new Subject<SignalLog[]>()
  events$ = new Subject<Signal>()

  // constructor () {
  //   this.events(Signal.GENERATE_DEMO_DATA).subscribe((x) => {console.log(x)})
  // }

  events (signal: Signal) {
    return this.events$.pipe(
      filter(x => x === signal)
    )
  }

  broadcast (signal: Signal) {
    this.events$.next(signal)
  }

  message (message: string) {
    this.messages.unshift({
      message,
      date: Date.now()
    })
    this.messages$.next(this.messages)
  }
}
