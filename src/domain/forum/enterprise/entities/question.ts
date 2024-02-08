import dayjs from 'dayjs'

import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optinal'

export interface QuestionProps {
  title: string
  content: string
  slug: Slug
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

class Question extends Entity<QuestionProps> {
  public get title(): string {
    return this.props.title
  }

  public set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  public get content(): string {
    return this.props.content
  }

  public set content(content: string) {
    this.props.content = content

    this.touch()
  }

  public get slug(): Slug {
    return this.props.slug
  }

  public get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  public get bestAnswerId(): UniqueEntityID | undefined {
    return this.props.bestAnswerId
  }

  public set bestAnswerId(bestAnswerId: UniqueEntityID) {
    this.props.bestAnswerId = bestAnswerId

    this.touch()
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.updatedAt
  }

  public isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  public get excerpt(): string {
    return this.props.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  public static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ): Question {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}

export { Question }
