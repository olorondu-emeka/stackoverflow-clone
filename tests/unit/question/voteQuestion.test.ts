import QuestionGateway from '../../__mocks__/dataGateways/questionGateway';
import VoteQuestion from '../../../src/core/useCases/question/VoteQuestion';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';

const QuestionDataGateway = new QuestionGateway();

const VoteQuestionUC = new VoteQuestion(QuestionDataGateway);

describe('Unit Test -- Vote Question', () => {
  afterEach(() => {
    QuestionDataGateway.resetDefault();
  });

  it('should throw a 404 error for a non-existent question', async () => {
    QuestionDataGateway.setQuestion(null);

    const response: FinalResponse = await VoteQuestionUC.execute(1, 'upvote');
    const { statusCode, data } = response;

    expect(statusCode).toEqual(404);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should throw a 500 error for an undefined vote property', async () => {
    const response: FinalResponse = await VoteQuestionUC.execute(1, 'upvote');
    const { statusCode, data } = response;

    expect(statusCode).toEqual(500);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should successfully upvote a question', async () => {
    QuestionDataGateway.addVotes();

    const response: FinalResponse = await VoteQuestionUC.execute(1, 'upvote');
    const { statusCode, data } = response;

    expect(statusCode).toEqual(200);
    expect(data).toHaveProperty('status', 'success');
  });

  it('should successfully downvote a question', async () => {
    QuestionDataGateway.addVotes();

    const response: FinalResponse = await VoteQuestionUC.execute(1, 'downvote');
    const { statusCode, data } = response;

    expect(statusCode).toEqual(200);
    expect(data).toHaveProperty('status', 'success');
  });
});
