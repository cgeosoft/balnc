import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { OrbitDBIntegration, OrbitDBService } from '@balnc/core'
import { interval, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

@Component({
  selector: 'app-integration-orbitdb',
  templateUrl: './orbitdb.component.html',
  styleUrls: ['./orbitdb.component.scss']
})
export class OrbitDBComponent implements OnInit {

  @Input() config: OrbitDBIntegration
  @Output() configChange = new EventEmitter<OrbitDBIntegration>()

  peers$: Observable<any>
  showPeers = true
  newAddress

  get identity () {
    return this.orbitDBService.intentity?.id
  }

  get address () {
    return this.orbitDBService.runningAddress
  }

  constructor (
    private orbitDBService: OrbitDBService
  ) { }

  ngOnInit () {
    this.peers$ = interval(2000).pipe(
      mergeMap(() => this.orbitDBService.getPeers())
    )
  }

  useExisting (address) {
    this.newAddress = address
    this.config.address = this.newAddress
    this.configChange.emit(this.config)
  }

  generate () {
    this.newAddress = this.orbitDBService.generateAddress()
    this.config.address = this.newAddress
    this.configChange.emit(this.config)
  }
}
