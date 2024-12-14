import { HttpService } from '@nestjs/axios';
export declare class TranslationService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private cache;
    translateText(id: string, text: string, targetLang: string): Promise<string>;
    private fetchTranslation;
}
