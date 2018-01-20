import { Proportion } from './proportion';
import { Author } from './author';

export class Recipe {
    id: number; // Id
    author: Author;
    rating: number; // Notation
    proportions: Proportion[]; // Quantité avec ingredients
    servings: number; // Nombre de personnes
    preparation: Date; // Temps de préparation
    cook: Date; // Temps de cuisson
    readyin: Date; // Prêt en combien de temps
    published: boolean; // Publié sur le site
    locale: {
        [key: string]: RecipeLocale
    };
}

export class RecipeLocale {
    title: string; // Titre
    description: string; // Petite description
    directions: RecipeDirection[]; // Etapes de préparation
    available : boolean; // Dispo dans la langue
}

export class RecipeDirection {
    order: number; // N° d'ordre d'affichage
    description : string; // Description de l etape
}

