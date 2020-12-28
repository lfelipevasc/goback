import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(()=>{
         fakeUsersRepository = new FakeUsersRepository();
         listProviders = new ListProvidersService(fakeUsersRepository);
    });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: 'luisluis',
    })

    const user2 = await fakeUsersRepository.create({
        name: 'Luis Felipe',
        email:'luisfelipe@luisfelipe.com',
        password: 'luisfelipe',
    })

    const loggeduser = await fakeUsersRepository.create({
        name: 'Felipe',
        email:'felipe@felipe.com',
        password: 'felipefelipe',
    })

    const providers = await listProviders.execute({
        user_id: loggeduser.id,
    });

    expect(providers).toEqual([user1,user2]);
  });
});
