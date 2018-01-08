import { Recipe } from './Recipe';

export class Category {
    id: number;
    title: string;
    description: string;
    recipes: Recipe[];
    published: boolean;
}