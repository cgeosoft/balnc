export type Entity = {
  name: string
  schema: any
  schemaPath?: string
  sync: boolean
  single?: boolean
  migrationStrategies?: any
}
