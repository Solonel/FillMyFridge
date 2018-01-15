export class Language {
    id: string;
    flag: string;
    locale: {
        [key: string]: LanguageLocale
    };
}

export class LanguageLocale {
    label: string;
}

export class LanguageLight {
    id: string;
    label: string;
    flag: string;
}