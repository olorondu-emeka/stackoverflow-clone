// model imports
import UserModel from 'data/database/models/User';
import SessionModel from 'data/database/models/Session';
import QuestionModel from 'data/database/models/Question';

// interface implementation imports
import UserGateway from 'data/implementations/User';
import SessionGateway from 'data/implementations/Session';
import QuestionGateway from 'data/implementations/Question';

// interface instantiations
const UserDataGateway = new UserGateway(UserModel);
const SessionDataGateway = new SessionGateway(SessionModel);
const QuestionDataGateway = new QuestionGateway(QuestionModel);

// exports
export { UserDataGateway, SessionDataGateway, QuestionDataGateway };
