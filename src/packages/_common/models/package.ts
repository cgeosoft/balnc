declare interface IPackage {
  id: string
  title: string
  description: string
  icon: any
  menu: string
  config?: any
}
export type Package = IPackage
