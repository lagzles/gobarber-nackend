import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  storage: DiskStorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.storage,
);

