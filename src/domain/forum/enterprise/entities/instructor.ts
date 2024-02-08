import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  public get name(): string {
    return this.props.name
  }

  public static create(props: InstructorProps, id?: UniqueEntityID) {
    const question = new Instructor(
      {
        ...props,
      },
      id,
    )

    return question
  }
}
