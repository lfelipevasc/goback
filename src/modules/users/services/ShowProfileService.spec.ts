import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(()=>{
         fakeUsersRepository = new FakeUsersRepository();
         showProfile = new ShowProfileService(fakeUsersRepository);
    });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: 'luisluis',
    })

    const profile = await showProfile.execute({
        user_id: user.id,
    });

    expect(profile.name).toBe('Luis');
    expect(profile.email).toBe('luis@luis.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    expect(showProfile.execute({
        user_id: 'non-existing-user-id',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
