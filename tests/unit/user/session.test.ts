import UserGateway from '../../__mocks__/dataGateways/userGateway';
import SessionGateway from '../../__mocks__/dataGateways/sessionGateway';
import RegisterUser from '../../../src/core/useCases/user/RegisterUser';
import CreateSession from '../../../src/core/useCases/user/CreateSession';
import DestroySession from '../../../src/core/useCases/user/DestroySession';
import generateToken from '../../../src/entrypoint/web/helpers/generateToken';
import { getNewUser } from '../../__mocks__/entities/user';
import { FinalResponse } from '../../../src/core/definitions/CommonTypes';
import {
  mockVerifyPasswordFalse,
  mockVerifyPasswordTrue
} from '../../__mocks__/helpers/mockVerifyPassword';

const newUser = getNewUser();

const UserDataGateway = new UserGateway();
const SessionDataGateway = new SessionGateway();

const RegisterUserUC = new RegisterUser(
  UserDataGateway,
  SessionDataGateway,
  generateToken
);

const CreateSessionUCTrue = new CreateSession(
  UserDataGateway,
  SessionDataGateway,
  generateToken,
  mockVerifyPasswordTrue
);

const CreateSessionUCFalse = new CreateSession(
  UserDataGateway,
  SessionDataGateway,
  generateToken,
  mockVerifyPasswordFalse
);

const DestroySessionUC = new DestroySession(SessionDataGateway);

describe('Unit Test -- Session', () => {
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

  it('should throw an error for a non-existent user', async () => {
    UserDataGateway.setUser(null);

    const response: FinalResponse = await CreateSessionUCFalse.execute(
      newUser.email,
      newUser.password
    );
    const { statusCode, data } = response;

    expect(statusCode).toEqual(404);
    expect(data).toHaveProperty('status', 'error');
  });

  it('should successfully login user', async () => {
    const response: FinalResponse = await CreateSessionUCTrue.execute(
      newUser.email,
      newUser.password
    );
    const { statusCode, data } = response;

    expect(statusCode).toEqual(200);
    expect(data).toHaveProperty('status', 'success');
  });

  it('should successfully logout user', async () => {
    const response: FinalResponse = await DestroySessionUC.execute('any token');
    const { statusCode, data } = response;

    expect(statusCode).toEqual(200);
    expect(data).toHaveProperty('status', 'success');
  });
});
