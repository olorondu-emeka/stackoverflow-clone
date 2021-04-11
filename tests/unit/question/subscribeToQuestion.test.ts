import QuestionGateway from '../../__mocks__/dataGateways/questionGateway';
import SubscribeToQuestion from '../../../src/core/useCases/question/SubscribeToQuestion';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';

const QuestionDataGateway = new QuestionGateway();
const SubscribeToQuestionUC = new SubscribeToQuestion(QuestionDataGateway);

describe('Unit Test -- SubscribeToQuestion', () => {
  afterEach(() => {
    QuestionDataGateway.resetDefault();
  });

  it('should throw a 404 error for a non-existent question', async () => {
    QuestionDataGateway.setQuestion(null);

    const response: FinalResponse = await SubscribeToQuestionUC.execute(1, 2);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(404);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should throw a 409 error for an existing subscription', async () => {
    const response: FinalResponse = await SubscribeToQuestionUC.execute(1, 2);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(409);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should successfully create a new subscription', async () => {
    QuestionDataGateway.setQuestionSubscription(null);

    const response: FinalResponse = await SubscribeToQuestionUC.execute(1, 2);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(201);
    expect(data).toHaveProperty('status', 'success');
  });
});
