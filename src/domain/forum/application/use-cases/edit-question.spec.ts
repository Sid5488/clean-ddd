import { InMemoryQuestionsRepository } from '@/../tests/repositories/in-memory-questions-repository'
import { makeQuestion } from '@/../tests/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Pergunta Teste',
      content: 'Conteúdo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta Teste',
      content: 'Conteúdo teste',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'Pergunta Test',
      content: 'Conteúdo teste',
      questionId: newQuestion.id.toValue(),
    })

    expect(() =>
      sut.execute({
        authorId: 'author-2',
        title: 'Pergunta Test',
        content: 'Conteúdo teste',
        questionId: newQuestion.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
