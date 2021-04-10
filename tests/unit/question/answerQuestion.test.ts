import QuestionGateway from '../../__mocks__/dataGateways/questionGateway';
import AnswerQuestion from '../../../src/core/useCases/question/AnswerQuestion';
import { getNewAnswer } from '../../__mocks__/entities/question';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';

const newAnswer = getNewAnswer();

const QuestionDataGateway = new QuestionGateway();

const AnswerQuestionUC = new AnswerQuestion(QuestionDataGateway);

describe('Unit Test -- Answer Question', () => {
  afterEach(() => {
    QuestionDataGateway.resetDefault();
  });

  it('should successfully answer a new question', async () => {
    QuestionDataGateway.setAnswer(null);

    const response: FinalResponse = await AnswerQuestionUC.execute(newAnswer);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(201);
    expect(data).toHaveProperty('status', 'success');
  });

  it('should throw a 404 error for a non-existent question', async () => {
    QuestionDataGateway.setQuestion(null);

    const response: FinalResponse = await AnswerQuestionUC.execute(newAnswer);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(404);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should throw a 409 error for a question that has already been answered', async () => {
    const response: FinalResponse = await AnswerQuestionUC.execute(newAnswer);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(409);
    expect(data).toHaveProperty('status', 'error');
  });
});
