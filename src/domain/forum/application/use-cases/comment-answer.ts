import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerRepository } from '../repositories/answers-repository'
import { AnswerCommentRepository } from '../repositories/answer-comment-repository'

interface CommentAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answerCommentsRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentAnswerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }
  }
}
