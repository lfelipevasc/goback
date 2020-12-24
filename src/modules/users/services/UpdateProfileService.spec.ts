//import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(()=>{
         fakeUsersRepository = new FakeUsersRepository();
         fakeHashProvider = new FakeHashProvider();
         updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
    });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: 'luisluis',
    })

    const updateduser = await updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@example.com',
    });

    expect(updateduser.name).toBe('John Tre');
    expect(updateduser.email).toBe('johntre@example.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: 'luisluis',
    })

    const user = await fakeUsersRepository.create({
        name: 'Teste',
        email:'teste@luis.com',
        password: 'luisluis',
    })

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'Luis',
        email: 'luis@luis.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: '123456',
    })

    const updateduser = await updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@example.com',
        old_password: '123456',
        password: '123123'
    });

    expect(updateduser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: '123456',
    })

    await expect (updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@example.com',
        password: '123123'
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
        name: 'Luis',
        email:'luis@luis.com',
        password: '123456',
    })

    await expect (updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123'
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
