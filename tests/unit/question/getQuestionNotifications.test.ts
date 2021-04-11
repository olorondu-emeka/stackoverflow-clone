import QuestionGateway from '../../__mocks__/dataGateways/questionGateway';
import GetQuestionNotifications from '../../../src/core/useCases/question/GetQuestionNotifications';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';

const QuestionDataGateway = new QuestionGateway();
const GetQuestionNotificationsUC = new GetQuestionNotifications(
  QuestionDataGateway
);

describe('Unit Test -- GetQuestionNotifications', () => {
  afterEach(() => {
    QuestionDataGateway.resetDefault();
  });

  it('should throw a 404 error for a non-existent question', async () => {
    QuestionDataGateway.setQuestion(null);

    const response: FinalResponse = await GetQuestionNotificationsUC.execute(
      1,
      2
    );
    const { statusCode, data } = response;

    expect(statusCode).toEqual(404);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should throw a 404 error for a non-existent subscription', async () => {
    QuestionDataGateway.setQuestionSubscription(null);

    const response: FinalResponse = await GetQuestionNotificationsUC.execute(
      1,
      2
    );
    const { statusCode, data } = response;

    expect(statusCode).toEqual(404);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should successfully retrieve question notifications', async () => {
    const response: FinalResponse = await GetQuestionNotificationsUC.execute(
      1,
      2
    );
    const { statusCode, data } = response;

    expect(statusCode).toEqual(200);
    expect(data).toHaveProperty('status', 'success');
  });
});
