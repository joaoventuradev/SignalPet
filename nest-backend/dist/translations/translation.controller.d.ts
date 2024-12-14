import { TranslationService } from './translation.service';
export declare class TranslationController {
    private readonly translationService;
    constructor(translationService: TranslationService);
    translate(body: {
        id: string;
        text: string;
        targetLang: string;
    }): Promise<{
        translatedText: string;
    }>;
}
