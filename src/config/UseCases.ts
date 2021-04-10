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
import AskQuestion from 'core/useCases/question/AskQuestion';

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
const AskQuestionUC = new AskQuestion(QuestionDataGateway);

// export use cases instantiations
export { RegisterUserUC, CreateSessionUC, AskQuestionUC };
