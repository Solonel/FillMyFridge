export class Unit {
    id: number; // Id
    locale: {
        [key: string]: UnitLocale
    };
}
export class UnitLocale {
    title: string; //Nom de l'unitée
    shorted: string; //raccourcis utilisé (gr, l, etc.)
    available: boolean; // Unité disponible pour la langue
}