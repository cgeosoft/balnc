export interface Person {
  Name: string
  Avatar?: string
  Phones?: string[]
  Emails?: string[]
  Socials?: string[]
  Details?: any
}

export interface Office {
  Address: string
  Location?: string
  Phones?: string[]
  Emails?: string[]
}

export interface Company {
  Name: string
  Logo?: string
  Socials?: string[]
  Offices?: string[]
  Persons?: string[]
  TaxDetails?: TaxDetails
}

export interface TaxDetails {
  VatNumber: string
  TaxOffice: string
  Address: string
  LegalName: string
  Description: string
}

export interface ContactEvent {
  Company: string
  Person: string
  DateTime: string
  Type: string
  Description: string
}
