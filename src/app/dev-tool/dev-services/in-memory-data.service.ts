import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../../classes/user';
import { Author } from '../../classes/author';
import { Book } from '../../classes/book';
import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';
import { Proportion } from '../../classes/proportion';
import { Unit } from '../../classes/unit';
import { Category } from '../../classes/category';


export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const users: User[] = [
      { id: 1, gender: "1", firstName: 'Nice', lastName: 'Person', birthDate: "", email: 'su@email.fr', password: 'test' },
      { id: 2, gender: "1", firstName: 'Narco', lastName: 'Leptic', birthDate: "", email: 'user1@email.fr', password: 'test', },
      { id: 3, gender: "1", firstName: 'Bomba', lastName: 'Storm', birthDate: "", email: 'user2@email.fr', password: 'test' },
      { id: 4, gender: "2", firstName: 'Celeritas', lastName: 'Stique', birthDate: "", email: 'user3@email.fr', password: 'test' },
      { id: 5, gender: "3", firstName: 'Magneta', lastName: 'Magnet', birthDate: "", email: 'user4@email.fr', password: 'test' }
    ];

    const authors: Author[] = [
      { id: 1, name: "Author Name 1", firstname: "Author Firstname 1" },
      { id: 2, name: "Author Name 2", firstname: "Author Firstname 2" },
      { id: 3, name: "Author Name 3", firstname: "Author Firstname 3" },
      { id: 4, name: "Author Name 4", firstname: "Author Firstname 4" }
    ]

    const ingredients: Ingredient[] = [
      { id: 1, title: "Ingredient title 1", description: "Ingredient description 1", icon: "Ingredient icon 1" },
      { id: 2, title: "Ingredient title 2", description: "Ingredient description 2", icon: "Ingredient icon 2" },
      { id: 3, title: "Ingredient title 3", description: "Ingredient description 3", icon: "Ingredient icon 3" },
      { id: 4, title: "Ingredient title 4", description: "Ingredient description 4", icon: "Ingredient icon 4" }
    ]

    const units: Unit[] = [
      { id: 1, title: "Unit Title 1", description: "unit description 1" },
      { id: 2, title: "Unit Title 2", description: "unit description 2" },
      { id: 3, title: "Unit Title 3", description: "unit description 3" },
      { id: 4, title: "Unit Title 4", description: "unit description 4" }
    ]

    const proportions: Proportion[] = [
      { quantity: 1, ingredient: ingredients[0], unit: units[0] },
      { quantity: 2, ingredient: ingredients[1], unit: units[1] },
      { quantity: 3, ingredient: ingredients[2], unit: units[2] },
      { quantity: 4, ingredient: ingredients[3], unit: units[3] }
    ]

    const recipes: Recipe[] = [
      {
        id: 1,
        title: "Recipe title 1",
        description: "Recipe description 1",
        directions: ["Recipe Etape 1", "Recipe Etape 2"],
        proportions: [proportions[0]],
        servings: 1,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: true,
        rating: 1,
        author: authors[0]
      },
      {
        id: 2,
        title: "Recipe title 2",
        description: "Recipe description 2",
        directions: ["Recipe Etape 1", "Recipe Etape 2"],
        proportions: [proportions[1]],
        servings: 1,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: true,
        rating: 2,
        author: authors[1]
      },
      {
        id: 3,
        title: "Recipe title 3",
        description: "Recipe description 3",
        directions: ["Recipe Etape 3", "Recipe Etape 3"],
        proportions: [proportions[2]],
        servings: 3,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: false,
        rating: 3,
        author: authors[2]
      }, {
        id: 4,
        title: "Recipe title 4",
        description: "Recipe description 4",
        directions: ["Recipe Etape 4", "Recipe Etape 4"],
        proportions: [proportions[3]],
        servings: 4,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: false,
        rating: 4,
        author: authors[3]
      }
    ];

    const books: Book[] = [
      {
        id: 1,
        title: "titre 1",
        description: "description 1",
        price: 1,
        rating: 1,
        published: true,
        recipes: recipes,
        author: authors[0]
      }, {
        id: 2,
        title: "titre 2",
        description: "description 2",
        price: 2,
        rating: 2,
        published: false,
        recipes: recipes,
        author: authors[1]
      }
    ];

    const categories: Category[] = [
      {
        id: 1,
        title: "titre 1",
        description: "description 1",
        published: true,
        recipes: recipes,
      }, {
        id: 2,
        title: "titre 2",
        description: "description 2",
        published: false,
        recipes: recipes
      }
    ];

    return { users, authors, books, ingredients, proportions, recipes, units, categories };
  }
}