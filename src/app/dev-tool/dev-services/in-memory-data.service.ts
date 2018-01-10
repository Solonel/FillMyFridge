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
      { id: 1, gender: "Mr", firstName: 'Nice', lastName: 'Person', birthDate: "", email: 'su@email.fr', password: 'test' },
      { id: 2, gender: "Mr", firstName: 'Narco', lastName: 'Leptic', birthDate: "", email: 'user1@email.fr', password: 'test', },
      { id: 3, gender: "Mr", firstName: 'Bomba', lastName: 'Storm', birthDate: "", email: 'user2@email.fr', password: 'test' },
      { id: 4, gender: "Mme", firstName: 'Celeritas', lastName: 'Stique', birthDate: "", email: 'user3@email.fr', password: 'test' },
      { id: 5, gender: "Mlle", firstName: 'Magneta', lastName: 'Magnet', birthDate: "", email: 'user4@email.fr', password: 'test' }
    ];

    const authors: Author[] = [
      { id: 1, name: "", firstname: "", username: "clairette600" },
      { id: 2, name: "", firstname: "", username: "mapo9" }
    ]

    const ingredients: Ingredient[] = [
      { id: 1, title: "chocolat à pâtisser noir", description: "", icon: "" },
      { id: 2, title: "beurre", description: "", icon: "" },
      { id: 3, title: "oeufs", description: "", icon: "" },
      { id: 4, title: "farine", description: "", icon: "" },
      { id: 5, title: "sucre en poudre", description: "", icon: "" },
      { id: 6, title: "petit bol de mayonnaise", description: "", icon: "" },
      { id: 7, title: "tomates", description: "", icon: "" },
      { id: 8, title: "boules de mozzarella", description: "", icon: "" },
      { id: 9, title: "thym", description: "", icon: "" },
      { id: 10, title: "brins de ciboulette", description: "", icon: "" },
      { id: 11, title: "branche d'estragon", description: "", icon: "" },
      { id: 12, title: "branche de persil", description: "", icon: "" },
      { id: 13, title: "salade composée (en sachet)", description: "", icon: "" },
      { id: 14, title: "vinaigre balsamique", description: "", icon: "" },
      { id: 15, title: "branche de basilic", description: "", icon: "" },
    ]

    const units: Unit[] = [
      { id: 1, title: "g", description: "Gramme" },
      { id: 2, title: "l", description: "Litre" },
      { id: 3, title: "cuillère à café", description: "" },
      { id: 4, title: "branche", description: "" }
    ]

    const proportions: Proportion[] = [
      { quantity: 200, unit: units[0], ingredient: ingredients[0] }, // 1
      { quantity: 100, unit: units[0], ingredient: ingredients[1] }, // 2 
      { quantity: 3, unit: null, ingredient: ingredients[2] }, // 3
      { quantity: 50, unit: units[0], ingredient: ingredients[3] }, // 4
      { quantity: 100, unit: units[4], ingredient: ingredients[4] }, // 5
      { quantity: 4, unit: null, ingredient: ingredients[2], }, // 6
      { quantity: 1, unit: null, ingredient: ingredients[5], }, // 7
      { quantity: 8, unit: null, ingredient: ingredients[6], }, // 8 - salade tomate mozza
      { quantity: 2, unit: null, ingredient: ingredients[7], }, // 9 - salade tomate mozza
      { quantity: 1, unit: units[3], ingredient: ingredients[8], }, // 10 - salade tomate mozza
    ]

    const recipes: Recipe[] = [
      {
        id: 1,
        title: "Gâteau au chocolat fondant rapide",
        description: "",
        directions: [
          "Préchauffez votre four à 180°C (thermostat 6).",
          "Dans une casserole, faites fondre le chocolat et le beurre coupé en morceaux à feu très doux.",
          "Dans un saladier, ajoutez le sucre, les oeufs, la farine. Mélangez.",
          "Ajoutez le mélange chocolat/beurre. Mélangez bien.",
          "Beurrez et farinez votre moule puis y versez la pâte à gâteau.",
          "Faites cuire au four environ 20 minutes.",
          "A la sortie du four le gâteau ne paraît pas assez cuit. C'est normal, laissez-le refroidir puis démoulez- le."],
        proportions: [
          proportions[0],
          proportions[1],
          proportions[2],
          proportions[3],
          proportions[4]
        ],
        servings: 6,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: true,
        rating: 4.5,
        author: authors[0]
      },
      {
        id: 2,
        title: "Oeufs mimosa",
        description: "",
        directions: [
          "Faire durcir les oeufs 10 mn, puis les mettre dans l'eau froide.",
          "utiliser une mayonnaise prête vendue dans le commerce.",
          "Les oeufs écalés, les couper dans le sens de la longueur, séparer les blancs des jaunes.",
          "Dans une assiette creuse, émietter les jaunes à la fourchette, mélanger la moitié de ces jaunes émiettés avec la mayonnaise et réserver le reste.",
          "Remplir les demi-blancs de cette préparation, puis saupoudrer chaque demi-oeuf du reste de jaunes émiettés (ce qui fait le mimosa !!).",
          "Disposer les oeufs dans une assiette",
          "Servir frais."
        ],
        proportions: [
          proportions[5],
          proportions[6]
        ],
        servings: 4,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: true,
        rating: 5,
        author: authors[1]
      },
      {
        id: 3,
        title: "Tomates-mozza aux herbes",
        description: "Des tranches de tomate et de mozzarella parsemées d'herbes de provence",
        directions: [
          "Coupez des fines tranches de tomates et de mozzarella puis rangez-les dans cet ordre : une tranche de tomate puis une tranche de mozzarella et ainsi de suite.",
          "Saupoudrez-les de persil, ail, estragon, persillade lyophilisée, la ciboulette, du basilic et du thym.",
          "Mettez de la sauce de façon à ce que les tomates et les herbes en soit recouverts au 3/4.",
          "Prenez des belle feuilles de salade bien ondulées et bien vertes pour les mettre autour des tomates et de la mozzarella pour un beau petit décor raffiné.",
        ],
        proportions: [
          proportions[8],
          proportions[9]
        ],
        servings: 4,
        preparation: new Date(),
        cook: new Date(),
        readyin: new Date(),
        published: true,
        rating: 5,
        author: authors[1]
      }
    ];

    const categories: Category[] = [
      {
        id: 1,
        title: "Dessert",
        description: "Les desserts de l'application",
        published: true,
        recipes: [recipes[0]],
      }, {
        id: 2,
        title: "Entrées",
        description: "Les entrées de l'application",
        published: false,
        recipes: [
          recipes[1],
          recipes[2]
        ]
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


    return { users, authors, books, ingredients, proportions, recipes, units, categories };
  }
}