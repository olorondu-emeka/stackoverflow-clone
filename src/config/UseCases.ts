// interface implementations (gateways)
import { UserDataGateway, SessionDataGateway } from 'config/Interfaces';

// helper functions
import generateToken from 'entrypoint/web/helpers/generateToken';

// use cases classes
import RegisterUser from 'core/useCases/user/RegisterUser';

// use cases instantiations
const RegisterUserUC = new RegisterUser(
  UserDataGateway,
  SessionDataGateway,
  generateToken
);

// export use cases instantiations
export { RegisterUserUC };
