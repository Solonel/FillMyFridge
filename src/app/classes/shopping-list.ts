import { Recipe } from './recipe';
import { User } from './user';
import { Category } from './category';

// Liste de course au sens large, contient a la fois les recette, la liste de course, et la préparation des recettes.
// Une liste est attachée à un utilisateur.
export class ShoppingList {
    id: number;
    userId: User; // Seul cet utilisateur peut voir la liste / Utilisateur qui a créé la liste
    configs: ConfigurationShoppingList[]; // Notion de "Configuration" de liste. Indique les catégories de repas désirées par l'utilisateur + nb de repas, de personne etc...
    shoppings: { // Liste de course au sens propre, liste des éléments à acheter. Les quantités sont additionnées pour toutes les recettes de la liste (au sens large) courante.
        closed: Boolean; // Indique si les courses sont terminées
        shoppingItems: ShoppingListItem[]; // Element à acheter
    };
    cookings: { // Liste des recettes liée à cette configuration. Permet de cocher les recettes faites. 
        recipes: Recipe; // Recette 
        nbPers: Number; // Nb de personne sur la recette
        cooked: Boolean; // Indique si la recette à été cuisinée
    }[];
}

// Indique les recettes attendues pour cette configuration.
// Une configuration possède donc un nb de personne, un type de plat attendu (catégorie : Rapide, végé, cuistot, etc.), un nombre de repas à remonter de cette catégorie, la liste des recettes
export class ConfigurationShoppingList {
    nbPers: Number;// nb de personne
    category: Category; // un type de plat attendu (catégorie : Rapide, végé, cuistot, etc.) 
    nbMeal: Number; // un nombre de repas à remonter de cette catégorie 
    recipes: Recipe[];// la liste des recettes
}
// Element d'une liste de course, 
// Aliment à acheter
// Utilisation de string et non d'objet car l'utilisateur peut ajouter à sa liste d'autres éléments qui ne sont pas des "ingrédients" (paquet de gateau, papier toilette, etc.)
export class ShoppingListItem {
    quantity: Number // Quantité attendue pour l'élément (ex: 200)
    unit: String; // Unité de la quantité (ex: gr)
    item: String; // Nom de l'ingrédient
    bought: Boolean; // Acheté ou non.
}

/*ShoppingListe
{
  user : User
  config : ConfigurationShoppingListe[];
  shoppingItems : {
    closed: boolean; // course fait
    ShoppingItems[{quantité / unit / nom ingredient / check /}]       
  }
  cooking : Cooking [] {
              recipe : Recipe
              nbPers : number
              RecipeDone : boolean
            }
  closed : boolean;   // recette fait  + course fait     
}

ConfigurationShoppingListe {
  nb pers
  category
  nb repas
  recipe[]
}*/
