import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Author } from '../../classes/author';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // const users = [
    //   { id: 1, name: 'Mr. Nice', email: 'su@email.fr', password: 'test', role: 'superuser' },
    //   { id: 2, name: 'Narco', email: 'user1@email.fr', password: 'test', role: 'users' },
    //   { id: 3, name: 'Bombasto', email: 'user2@email.fr', password: 'test', role: 'users' },
    //   { id: 4, name: 'Celeritas', email: 'user3@email.fr', password: 'test', role: 'users' },
    //   { id: 5, name: 'Magneta', email: 'user4@email.fr', password: 'test', role: 'users' }
    // ];

    const authors: Author[] = [
      { id: 1, name: "Author Name 1", firstname: "Author Firstname 1" },
      { id: 2, name: "Author Name 2", firstname: "Author Firstname 2" },
      { id: 3, name: "Author Name 3", firstname: "Author Firstname 3" },
      { id: 4, name: "Author Name 4", firstname: "Author Firstname 4" }
    ]
    return {  authors };
    // return { users, authors };
  }
}