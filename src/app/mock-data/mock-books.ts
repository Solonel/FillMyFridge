import { Book } from '../classes/book';
import { Author } from '../classes/author';
import { Recipe } from '../classes/recipe';
import { Ingredient } from '../classes/ingredient';

import { RECIPES } from './mock-recipes'; 
import { AUTHORS } from './mock-author';

// export class Book {
//     id: number;
//     title: string;
//     description: string;
//     recipes: Array<Recipe>;
//     author: Author;
//     price: number;
//     rating: number;
//     published: boolean;
// }

export const BOOKS: Book[] = [
    {
        id: 1,
        title: "titre 1",
        description: "description 1",
        price: 1,
        rating: 1,
        published: true,
        recipes : RECIPES,
        author : AUTHORS[0]
    }, {
        id: 2,
        title: "titre 2",
        description: "description 2",
        price: 2,
        rating: 2,
        published: false,
        recipes : RECIPES,
        author : AUTHORS[1]
    }
];