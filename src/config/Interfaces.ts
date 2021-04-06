// model imports
import UserModel from 'data/database/models/User';
import SessionModel from 'data/database/models/Session';

// interface implementation imports
import UserGateway from 'data/implementations/User';
import SessionGateway from 'data/implementations/Session';

// interface instantiations
const UserDataGateway = new UserGateway(UserModel);
const SessionDataGateway = new SessionGateway(SessionModel);

// exports
export { UserDataGateway, SessionDataGateway };
