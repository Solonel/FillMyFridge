import { Recipe } from './Recipe';

export class Category {
    id: number;
    title: string;
    description: string;
    recipes: Array<Recipe>;
    published: boolean;
}