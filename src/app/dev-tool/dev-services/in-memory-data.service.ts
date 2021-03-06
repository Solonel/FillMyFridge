import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../../classes/user';
import { Author } from '../../classes/author';
import { Book } from '../../classes/book';
import { Ingredient } from '../../classes/ingredient';
import { Recipe } from '../../classes/recipe';
import { Proportion } from '../../classes/proportion';
import { Unit } from '../../classes/unit';
import { Category } from '../../classes/category';
import { Language } from '../../classes/language';


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


    
    const languages: Language[] = [
      {
        id: 'fr-fr',
        flag: "flag-icon-fr",
        locale: {
          "fr-fr": {
            label: 'Français'
          },
          "en-en": {
            label: 'French'
          },
          "es-es": {
            label: 'Francès'
          }
        }
      },
      {
        id: 'en-en',
        flag: "flag-icon-gb",
        locale: {
          "fr-fr": {
            label: 'Anglais'
          },
          "en-en": {
            label: 'English'
          },
          "es-es": {
            label: 'Inglès'
          }
        }
      },
      {
        id: 'es-es',
        flag: "flag-icon-es",
        locale: {
          "fr-fr": {
            label: 'Espagnol'
          },
          "en-en": {
            label: 'Spanish'
          },
          "es-es": {
            label: 'Español'
          }
        }
      }
    ]

    const ingredients: Ingredient[] = [
      {
        id: 1, locale: {
          "fr-fr": { title: { singular: "chocolat pâtisser noir", plural: "" }, description: "fr-fr description 1", available: true }
        }, image: ""
      },
      {
        id: 2, locale: {
          "fr-fr": { title: { singular: "beurre", plural: "beurres" }, description: "fr-fr description 2", available: true },
          "en-en": { title: { singular: "butter", plural: "butters" }, description: "en-en description 2", available: false }
        }, image: ""
      },
      {
        id: 3, locale: {
          "fr-fr": { title: { singular: "oeuf", plural: "oeufs" }, description: "fr-fr description 3", available: true }
        }, image: ""
      },
      {
        id: 4, locale: {
          "fr-fr": { title: { singular: "farine", plural: "farines" }, description: "fr-fr description 4", available: true }
        }, image: ""
      },
      {
        id: 5, locale: {
          "fr-fr": { title: { singular: "sucre en poudre", plural: "sucres en poudre" }, description: "fr-fr description 5", available: true }
        }, image: ""
      },
      {
        id: 6, locale: {
          "fr-fr": { title: { singular: "mayonnaise", plural: "mayonnaises" }, description: "fr-fr description 6", available: true }
        }, image: ""
      },
      {
        id: 7, locale: {
          "fr-fr": { title: { singular: "tomate", plural: "tomates" }, description: "fr-fr description 7", available: true }
        }, image: ""
      },
      {
        id: 8, locale: {
          "fr-fr": { title: { singular: "boule de mozzarella", plural: "boules de mozzarella" }, description: "fr-fr description 8", available: true }
        }, image: ""
      },
      {
        id: 9, locale: {
          "fr-fr": { title: { singular: "thym", plural: "" }, description: "fr-fr description 9", available: true }
        }, image: ""
      },
      {
        id: 10, locale: {
          "fr-fr": { title: { singular: "ciboulette", plural: "ciboulettes" }, description: "fr-fr description 10", available: true }
        }, image: ""
      },
      {
        id: 11, locale: {
          "fr-fr": { title: { singular: "estragon", plural: "estragons" }, description: "fr-fr description 11", available: true }
        }, image: ""
      },
      {
        id: 12, locale: {
          "fr-fr": { title: { singular: "persil", plural: "persils" }, description: "fr-fr description 12", available: true }
        }, image: ""
      },
      {
        id: 13, locale: {
          "fr-fr": { title: { singular: "salade composée (en sachet)", plural: "salades composées" }, description: "fr-fr description 13", available: true }
        }, image: ""
      },
      {
        id: 14, locale: {
          "fr-fr": { title: { singular: "vinaigre balsamique", plural: "vinaigres balsamique" }, description: "fr-fr description 14", available: true }
        }, image: ""
      },
      {
        id: 15, locale: {
          "fr-fr": { title: { singular: "basilic", plural: "basilics" }, description: "fr-fr description 15", available: true }
        }, image: ""
      },
    ]

    const units: Unit[] = [
      {
        id: 1, locale: {
          "fr-fr": { title: "gramme", shorted: "gr", available: true },
          "en-en": { title: "gram", shorted: "gr", available: true },
          "es-es": { title: "gramo", shorted: "gr", available: true }
        }
      },
      {
        id: 2, locale: {
          "fr-fr": {
            title: "litre", shorted: "l", available: true
          }
        }
      },
      {
        id: 3, locale: {
          "fr-fr": {
            title: "cuillère à café", shorted: "cc", available: true
          }
        }
      },
      {
        id: 4, locale: {
          "fr-fr": {
            title: "branche", shorted: "br", available: true
          }
        }
      }
    ]

    const proportions: Proportion[] = [
      { quantity: 200, unit: units[0], ingredient: ingredients[0] }, // 0
      { quantity: 100, unit: units[0], ingredient: ingredients[1] }, // 1 
      { quantity: 3, unit: null, ingredient: ingredients[2] }, // 2
      { quantity: 50, unit: units[0], ingredient: ingredients[3] }, // 3
      { quantity: 100, unit: units[4], ingredient: ingredients[4] }, // 4
      { quantity: 4, unit: null, ingredient: ingredients[2], }, // 5
      { quantity: 1, unit: null, ingredient: ingredients[5], }, // 6
      { quantity: 8, unit: null, ingredient: ingredients[6], }, // 7 - salade tomate mozza
      { quantity: 2, unit: null, ingredient: ingredients[7], }, // 8 - salade tomate mozza
      { quantity: 1, unit: units[3], ingredient: ingredients[8], }, // 9 - salade tomate mozza
    ]


    const categoriesRecipe: Category[] = [
      {
        id: 1,
        locale: {
          "fr-fr": {
            title: "Desserts", description: "Les desserts de l'application", available: true
          },
          "en-en": {
            title: "Desserts", description: "Application's desserts", available: true
          },
        },
        published: true,
        recipes: [],
      }, {
        id: 2,
        locale: {
          "fr-fr": {
            title: "Entrées", description: "Les entrées de l'application", available: true
          },
          "en-en": {
            title: "Appetizers", description: "Application's appetizers.", available: true
          },
        },
        published: false,
        recipes: []
      }
    ];

    const recipes: Recipe[] = [
      {
        id: 1,
        proportions: [
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
        author: authors[0],
        categories : [categoriesRecipe[0]],
        locale: {
          "fr-fr": {
            title: "Gâteau au chocolat fondant rapide",
            description: "",
            directions: [
              { order: 1, description: "Préchauffez votre four à 180°C (thermostat 6)." },
              { order: 2, description: "Dans une casserole, faites fondre le chocolat et le beurre coupé en morceaux à feu très doux." },
              { order: 3, description: "Dans un saladier, ajoutez le sucre, les oeufs, la farine. Mélangez." },
              { order: 4, description: "Ajoutez le mélange chocolat/beurre. Mélangez bien." },
              { order: 5, description: "Beurrez et farinez votre moule puis y versez la pâte à gâteau." },
              { order: 6, description: "Faites cuire au four environ 20 minutes." },
              { order: 7, description: "A la sortie du four le gâteau ne paraît pas assez cuit. C'est normal, laissez-le refroidir puis démoulez- le." }],
            available: true
          }
        }
      },
      {
        id: 2,
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
        author: authors[1],
        categories : [categoriesRecipe[1]],
        locale: {
          "fr-fr": {
            title: "Oeufs mimosa",
            description: "",
            directions: [
              { order: 1, description: "Faire durcir les oeufs 10 mn, puis les mettre dans l'eau froide." },
              { order: 2, description: "utiliser une mayonnaise prête vendue dans le commerce." },
              { order: 3, description: "Les oeufs écalés, les couper dans le sens de la longueur, séparer les blancs des jaunes." },
              { order: 4, description: "Dans une assiette creuse, émietter les jaunes à la fourchette, mélanger la moitié de ces jaunes émiettés avec la mayonnaise et réserver le reste." },
              { order: 5, description: "Remplir les demi-blancs de cette préparation, puis saupoudrer chaque demi-oeuf du reste de jaunes émiettés (ce qui fait le mimosa !!)." },
              { order: 6, description: "Disposer les oeufs dans une assiette" },
              { order: 7, description: "Servir frais." }
            ],
            available: true
          }
        }
      },
      {
        id: 3,
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
        author: authors[1],
        categories : [],
        locale: {
          "fr-fr": {
            title: "Tomates-mozza aux herbes",
            description: "Des tranches de tomate et de mozzarella parsemées d'herbes de provence",
            directions: [
              { order: 1, description: "Coupez des fines tranches de tomates et de mozzarella puis rangez-les dans cet ordre : une tranche de tomate puis une tranche de mozzarella et ainsi de suite." },
              { order: 2, description: "Saupoudrez-les de persil, ail, estragon, persillade lyophilisée, la ciboulette, du basilic et du thym." },
              { order: 3, description: "Mettez de la sauce de façon à ce que les tomates et les herbes en soit recouverts au 3/4." },
              { order: 4, description: "Prenez des belle feuilles de salade bien ondulées et bien vertes pour les mettre autour des tomates et de la mozzarella pour un beau petit décor raffiné." },
            ],
            available: true
          }
        }
      }
    ];

    const categories: Category[] = [
      {
        id: 1,
        locale: {
          "fr-fr": {
            title: "Desserts", description: "Les desserts de l'application", available: true
          },
          "en-en": {
            title: "Desserts", description: "Application's desserts", available: true
          },
        },
        published: true,
        recipes: [recipes[0]],
      }, {
        id: 2,
        locale: {
          "fr-fr": {
            title: "Entrées", description: "Les entrées de l'application", available: true
          },
          "en-en": {
            title: "Appetizers", description: "Application's appetizers.", available: true
          },
        },
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

    return { users, authors, books, ingredients, proportions, recipes, units, categories, languages };
  }
}