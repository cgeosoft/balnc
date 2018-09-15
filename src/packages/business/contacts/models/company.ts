import { RxDocument } from 'rxdb'

export interface Company {
  name: string
  logo?: string
  socials?: string[]
  offices?: Office[]
  persons?: string[]
  taxDetails?: TaxDetails
  insertedAt: string
  updatedAt: string
}
export interface Office {
  address: string
  location?: string
  phones?: string[]
  emails?: string[]
}
export interface TaxDetails {
  vatNumber: string
  taxOffice: string
  address: string
  legalName: string
  description: string
}
export type RxCompanyDocument = RxDocument<Company> & Company
