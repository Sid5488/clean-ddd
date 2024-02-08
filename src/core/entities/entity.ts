import { UniqueEntityID } from './unique-entity-id'

export class Entity<T> {
  private _id: UniqueEntityID
  protected props: T

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID(id)
  }

  get id() {
    return this._id
  }
}
