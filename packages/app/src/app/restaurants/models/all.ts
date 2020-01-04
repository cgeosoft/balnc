declare interface ITable {
  name: string,
}

declare interface IReservation {
  table: string,
  customer: string,
  datetime: string,
}

declare interface ICatalogue {
  title: string,
  color: string,
  icon: string,
  description: string,
  sort: number,
  items: ICatalogueItem[],
}

declare interface ICatalogueItem {
  label: string,
  description: string,
  meterials: string[],
}

declare interface IOrder {
  table: string,
  datetime: string,
  item: any,
  meterials: string[],
  isDelivered: boolean,
  isTreat: boolean,
  price: number,
  comments: string,
}

declare interface IBill {
  table: string,
  datetime: string,
  price: number,
  comments: string,
}

export type Table = ITable
