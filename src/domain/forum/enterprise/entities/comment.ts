import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CommentProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  public get content(): string {
    return this.props.content
  }

  public set content(content: string) {
    this.props.content = content

    this.touch()
  }

  public get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
