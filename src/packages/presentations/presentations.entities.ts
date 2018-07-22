import { Entity } from '@balnc/common'
import { PresentationSchema } from './models/presentation'

export const PresentationsEntities: Entity[] = [{
  name: 'presentation',
  schema: PresentationSchema,
  sync: true
}]
