import { Recipe } from './Recipe';

export class Category {
    id: number;
    locale: {
        [key: string]: CategoryLocale;
    };
    recipes: Recipe[];
    published: boolean;
}
export class CategoryLocale {
    title: string;
    description: string;
    available: boolean;
}

export class CategoryLight {
    id: number;
    image: string;
    title: string;
    description: string;
    available: boolean;
}