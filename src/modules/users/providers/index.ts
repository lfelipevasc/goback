import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCyrptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCyrptHashProvider);
