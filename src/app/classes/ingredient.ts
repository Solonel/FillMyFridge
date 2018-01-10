export class Ingredient {
    id: number;
    locale: IngredientLocale;
    icon: string;
}
export class IngredientLocale {
    [key: string]: IngredientLocaleDetail;
}
export class IngredientLocaleDetail {
    title: Pluralization;
    description: string;
    available: boolean;
}
export class Pluralization {
    singular: string;
    plural: string;
}


//{ id: 1, locale: { "fr-fr": { title: { singulier: "chocolat pâtisser noir", pluriel: "" }, description: "", }, "en-us" }, icon: "" },