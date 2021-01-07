"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeCacheProvider;
let listProviders;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Luis',
      email: 'luis@luis.com',
      password: 'luisluis'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Luis Felipe',
      email: 'luisfelipe@luisfelipe.com',
      password: 'luisfelipe'
    });
    const loggeduser = await fakeUsersRepository.create({
      name: 'Felipe',
      email: 'felipe@felipe.com',
      password: 'felipefelipe'
    });
    const providers = await listProviders.execute({
      user_id: loggeduser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});