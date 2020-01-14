
export class RepositoryHelpers {

  static mapEntity (entity) {
    // console.log('map', entity._id)
    return {
      ...entity.c,
      _id: entity._id,
      _date: entity.d,
      _type: entity.t,
      _group: entity.g,
      _mark: entity.m,
      _tags: entity.s
    }
  }
}
