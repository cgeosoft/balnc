import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import * as Stripe from 'stripe'

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html'
})
export class StripeComponent implements OnInit {

  balance: Stripe.balance.IBalance
  paymentIntents: Stripe.IList<Stripe.paymentIntents.IPaymentIntent>

  get integrations () {
    return {
      ...{
        stripe: {
          key: null
        }
      }
    }
  }

  constructor (
    private configService: ConfigService,
    private http: HttpClient
  ) { }

  async ngOnInit () {
    await this.refreshStripe()
  }

  async applyStripe () {
    this.configService.update({
      ...this.configService.workspace,
      ...{
        integrations: {
          stripe: this.integrations.stripe
        }
      }
    })
    await this.refreshStripe()
  }

  async refreshStripe () {
    if (!this.integrations?.stripe?.key) return

    this.balance = await this.http.get<Stripe.balance.IBalance>('https://api.stripe.com/v1/balance', {
      headers: {
        Authorization: `Bearer ${this.integrations.stripe.key}`
      }
    }).toPromise()

    this.paymentIntents = await this.http.get<Stripe.IList<Stripe.paymentIntents.IPaymentIntent>>('https://api.stripe.com/v1/payment_intents', {
      headers: {
        Authorization: `Bearer ${this.integrations.stripe.key}`
      }
    }).toPromise()
  }
}
