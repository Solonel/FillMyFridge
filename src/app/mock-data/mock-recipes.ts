import { Book } from '../classes/book';
import { Author } from '../classes/author';
import { Recipe } from '../classes/recipe';
import { Ingredient } from '../classes/ingredient';

import { INGREDIENTS } from './mock-ingredient';
import { AUTHORS } from './mock-author';

// export class Recipe {
//     id: number; // Id
//     title: string; // Titre
//     description: string; // Petite description
//     directions : Array<string>; // Etapes de préparation
//     ingredients: Array<{quantity : string, ingredient : Ingredient}>; // Quantité avec ingredients
//     servings: number; // Nombre de personnes
//     preparation: Date; // Temps de préparation
//     cook: Date; // Temps de cuisson
//     readyIn: Date; // Prêt en combien de temps
//     published : boolean; // Publié sur le site
//     rating : number; // Notation
//     author : Author;
// }

export const RECIPES: Recipe[] = [
    {
        id: 1, 
        title: "Recipe title 1", 
        description: "Recipe description 1", 
        directions: ["Recipe Etape 1", "Recipe Etape 2"],
        ingredients: [INGREDIENTS[0]],
        servings: 1, 
        preparation: new Date(), 
        cook: new Date(), 
        readyin: new Date(), 
        published: true, 
        rating: 1,
        author: AUTHORS[0]
    },
    {
        id: 2, 
        title: "Recipe title 2", 
        description: "Recipe description 2", 
        directions: ["Recipe Etape 1", "Recipe Etape 2"],
        ingredients: [INGREDIENTS[0]],
        servings: 1, 
        preparation: new Date(), 
        cook: new Date(), 
        readyin: new Date(), 
        published: true, 
        rating: 2,
        author: AUTHORS[0]
    },
    {
        id: 3, 
        title: "Recipe title 3", 
        description: "Recipe description 3", 
        directions: ["Recipe Etape 3", "Recipe Etape 3"],
        ingredients: [INGREDIENTS[0]],
        servings: 3, 
        preparation: new Date(), 
        cook: new Date(), 
        readyin: new Date(), 
        published: false, 
        rating: 3,
        author: AUTHORS[0]
    }, {
        id: 4, 
        title: "Recipe title 4", 
        description: "Recipe description 4", 
        directions: ["Recipe Etape 4", "Recipe Etape 4"],
        ingredients: [INGREDIENTS[1]],
        servings: 4, 
        preparation: new Date(), 
        cook: new Date(), 
        readyin: new Date(), 
        published: false, 
        rating: 4,
        author: AUTHORS[0]
    }
];

