import { Pluralization } from './pluralization';

export class Ingredient {
    id: number;
    image: string;
    locale: {
        [key: string]: IngredientLocale
    };
}

export class IngredientLocale {
    title: Pluralization;
    description: string;
    available: boolean;
}

export class IngredientLight {
    id: number;
    image: string;
    title: Pluralization;
    description: string;
    available: boolean;    
}