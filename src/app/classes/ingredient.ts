export class Ingredient {
    id: number;
    locale: {
        [key: string]: IngredientLocale
    };
    icon: string;
}

export class IngredientLocale {
    title: Pluralization;
    description: string;
    available: boolean;
}

export class Pluralization {
    singular: string;
    plural: string;
}


//{ id: 1, locale: { "fr-fr": { title: { singulier: "chocolat pâtisser noir", pluriel: "" }, description: "", }, "en-us" }, icon: "" },