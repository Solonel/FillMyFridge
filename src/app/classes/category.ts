import { Recipe } from './Recipe';

export class Category {
    id: number;
    locale: CategoryLocale;
    recipes: Recipe[];
    published: boolean;
}
export class CategoryLocale {
    [key: string]: CategoryLocaleDetail;
}
export class CategoryLocaleDetail {
    title: string;
    description: string;
    available: boolean;
}