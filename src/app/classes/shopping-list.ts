import { Recipe } from './Recipe';
import { User } from './user';

export class ShoppingList {
    id: number;
    userId: User;
    recipes: Recipe[];
    items: ShoppingListItem[];
}
export class ShoppingListItem {
    id: number;
    quantity: number
    unit: string;
    item: string;
}