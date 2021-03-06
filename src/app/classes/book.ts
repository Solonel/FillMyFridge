import { Recipe } from './Recipe';
import { Author } from './Author';

export class Book {
    id: number;
    title: string;
    description: string;
    recipes: Recipe[];
    author: Author;
    price: number;
    rating: number;
    published: boolean;
}