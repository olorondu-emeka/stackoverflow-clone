// interface implementations (gateways)
import {
  UserDataGateway,
  SessionDataGateway,
  QuestionDataGateway
} from 'config/Interfaces';

// helper functions
import generateToken from 'entrypoint/web/helpers/generateToken';

// use cases classes
import RegisterUser from 'core/useCases/user/RegisterUser';
import AskQuestion from 'core/useCases/question/AskQuestion';

// use cases instantiations
const RegisterUserUC = new RegisterUser(
  UserDataGateway,
  SessionDataGateway,
  generateToken
);
const AskQuestionUC = new AskQuestion(QuestionDataGateway);

// export use cases instantiations
export { RegisterUserUC, AskQuestionUC };
