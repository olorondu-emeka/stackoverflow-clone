import QuestionGateway from '../../__mocks__/dataGateways/QuestionGateway';
import AskQuestion from '../../../src/core/useCases/Question/AskQuestion';
import { getNewQuestion } from '../../__mocks__/entities/Question';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';

const newQuestion = getNewQuestion();

const QuestionDataGateway = new QuestionGateway();

const AskQuestionUC = new AskQuestion(QuestionDataGateway);

describe('Unit Test --- AskQuestion', () => {
  afterEach(() => {
    QuestionDataGateway.resetDefault();
  });

  it('user should successfully ask a question', async () => {
    QuestionDataGateway.setQuestion(null);

    const response: FinalResponse = await AskQuestionUC.execute(newQuestion);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(201);
    expect(data).toHaveProperty('status', 'success');
  });

  it('should throw a conflict error for an already existing question', async () => {
    const response: FinalResponse = await AskQuestionUC.execute(newQuestion);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(409);
    expect(data).toHaveProperty('status', 'error');
  });
});
