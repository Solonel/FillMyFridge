import { Ingredient } from './ingredient';
import { Author } from './author';

export class Recipe {
    id: number; // Id
    title: string; // Titre
    description: string; // Petite description
    directions : Array<string>; // Etapes de préparation
    ingredients: Array<Ingredient>; // Quantité avec ingredients
    servings: number; // Nombre de personnes
    preparation: Date; // Temps de préparation
    cook: Date; // Temps de cuisson
    readyIn: Date; // Prêt en combien de temps
    published : boolean; // Publié sur le site
    rating : number; // Notation
    author : Author;
}

