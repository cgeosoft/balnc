declare interface IEntity {
  name: string
  schema: any
  schemaPath?: string
  sync: boolean
  single?: boolean
  migrationStrategies?: any
}

export type Entity = IEntity
