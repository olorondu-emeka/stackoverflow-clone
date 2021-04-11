// interface implementations (gateways)
import {
  UserDataGateway,
  SessionDataGateway,
  QuestionDataGateway
} from 'config/Interfaces';

// helper functions
import generateToken from 'entrypoint/web/helpers/generateToken';
import passwordHelper from 'entrypoint/web/helpers/passwordHelper';

// use cases classes
import RegisterUser from 'core/useCases/user/RegisterUser';
import CreateSession from 'core/useCases/user/CreateSession';
import DestroySession from 'core/useCases/user/DestroySession';
import AskQuestion from 'core/useCases/question/AskQuestion';
import AnswerQuestion from 'core/useCases/question/AnswerQuestion';
import VoteQuestion from 'core/useCases/question/VoteQuestion';
import SubscribeToQuestion from 'core/useCases/question/SubscribeToQuestion';
import GetQuestionNotifications from 'core/useCases/question/GetQuestionNotifications';

// use cases instantiations
const RegisterUserUC = new RegisterUser(
  UserDataGateway,
  SessionDataGateway,
  generateToken
);
const CreateSessionUC = new CreateSession(
  UserDataGateway,
  SessionDataGateway,
  generateToken,
  passwordHelper.verify
);
const DestroySessionUC = new DestroySession(SessionDataGateway);
const AskQuestionUC = new AskQuestion(QuestionDataGateway);
const AnswerQuestionUC = new AnswerQuestion(QuestionDataGateway);
const VoteQuestionUC = new VoteQuestion(QuestionDataGateway);
const SubscribeToQuestionUC = new SubscribeToQuestion(QuestionDataGateway);
const GetQuestionNotificationsUC = new GetQuestionNotifications(
  QuestionDataGateway
);

// export use cases instantiations
export {
  RegisterUserUC,
  CreateSessionUC,
  DestroySessionUC,
  AskQuestionUC,
  AnswerQuestionUC,
  VoteQuestionUC,
  SubscribeToQuestionUC,
  GetQuestionNotificationsUC
};
