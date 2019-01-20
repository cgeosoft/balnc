export interface Order {
  Company: string
  Person: string
  Items: OrderItem[]
  TotalPrice: number
  TaxPrice: number
  FinalPrice: number
}

export interface OrderItem {
  RefCode: string
  Description: string
  Units: number
  UnitPrice: number
  TotalPrice: number
  TaxPercent: number
  TaxPrice: number
  FinalPrice: number
}

export interface OrderEvent {
  Order: string
  DateTime: string
  Type: string
  Description: string
}
