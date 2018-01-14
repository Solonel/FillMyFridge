import { Pluralization } from './pluralization';

export class Ingredient {
    id: number;
    icon: string;
    locale: {
        [key: string]: IngredientLocale
    };
}

export class IngredientLocale {
    title: Pluralization;
    description: string;
    available: boolean;
}