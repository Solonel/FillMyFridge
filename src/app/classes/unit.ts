export class Unit {
    id: number; // Id
    locale: UnitLocale; 
}
export class UnitLocale {
    [key: string]: UnitLocaleDetail;
}
export class UnitLocaleDetail {
    name:string; //Nom de l'unitée
    shorted: string; //raccourcis utilisé (gr, l, etc.)
    available: boolean; // Unité disponible pour la langue
}
