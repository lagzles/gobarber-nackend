import { container } from 'tsyringe';

import IHashProvider from './models/IHashProvider';
import BCryptHashProvider from './implementations/BCryptsHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
