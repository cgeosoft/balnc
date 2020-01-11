import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

export enum Signal {
  DEMO_GENERATE,
  DEMO_COMPLETED,
  DEMO_CLEAR
}

export interface SignalLog {
  date: number
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SignalService {

  logs: SignalLog[] = []
  logs$ = new Subject<SignalLog[]>()
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
    this.logs.unshift({
      message,
      date: Date.now()
    })
    this.logs$.next(this.logs)
  }
}
