import UserGateway from '../../__mocks__/dataGateways/userGateway';
import SessionGateway from '../../__mocks__/dataGateways/sessionGateway';
import RegisterUser from '../../../src/core/useCases/user/RegisterUser';
import generateToken from '../../../src/entrypoint/web/helpers/generateToken';
import { getNewUser } from '../../__mocks__/entities/user';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';

const newUser = getNewUser();

const UserDataGateway = new UserGateway();
const SessionDataGateway = new SessionGateway();

const RegisterUserUC = new RegisterUser(
  UserDataGateway,
  SessionDataGateway,
  generateToken
);

describe('Unit Test -- User', () => {
  afterEach(() => {
    UserDataGateway.resetDefault();
  });

  it('should register a new user successfully', async () => {
    UserDataGateway.setUser(null);

    const response: FinalResponse = await RegisterUserUC.execute(newUser);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(201);
    expect(data).toHaveProperty('status', 'success');
  });

  it('should throw a conflict error for an already existing user', async () => {
    const response: FinalResponse = await RegisterUserUC.execute(newUser);
    const { statusCode, data } = response;

    expect(statusCode).toEqual(409);
    expect(data).toHaveProperty('status', 'error');
  });
});
