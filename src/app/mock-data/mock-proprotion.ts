import { Ingredient } from "../classes/Ingredient";
import { Unit } from "../classes/Unit";
import { Proportion } from "../classes/proportion";
import { INGREDIENTS } from "./mock-ingredient"
import { UNITS } from "./mock-unit"

// export class Proportion {
//     quantity: number; // Titre
//     ingredient: Ingredient; // Petite description
//     unit : Unit; // Etapes de préparation
// }



export const PROPORTIONS: Proportion[] = [
    { quantity: 1, ingredient: INGREDIENTS[0], unit : UNITS[0] },
    { quantity: 2, ingredient: INGREDIENTS[1], unit : UNITS[1] },
    { quantity: 3, ingredient: INGREDIENTS[2], unit : UNITS[2] },
    { quantity: 4, ingredient: INGREDIENTS[3], unit : UNITS[3] }
]