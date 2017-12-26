import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'Mr. Nice', email: 'su@email.fr', password: 'test', role:'superuser' },
      { id: 2, name: 'Narco', email: 'user1@email.fr', password: 'test', role:'users' },
      { id: 3, name: 'Bombasto', email: 'user2@email.fr', password: 'test', role:'users' },
      { id: 4, name: 'Celeritas', email: 'user3@email.fr', password: 'test', role:'users' },
      { id: 5, name: 'Magneta', email: 'user4@email.fr', password: 'test', role:'users' }
    ];
    return {users};
  }
}