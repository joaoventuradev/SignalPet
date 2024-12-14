import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class TranslationService {
  constructor(private readonly httpService: HttpService) {}

  private cache = new Map<string, Map<string, string>>();

  async translateText(
    id: string,
    text: string,
    targetLang: string,
  ): Promise<string> {
    if (!this.cache.has(targetLang)) {
      this.cache.set(targetLang, new Map());
    }

    if (this.cache.get(targetLang).has(id)) {
      console.log('CACH RETURN');
      return this.cache.get(targetLang).get(id);
    }

    const translatedText = await this.fetchTranslation(text, targetLang);
    this.cache.get(targetLang).set(id, translatedText);
    console.log('LIB RETURN');
    return translatedText;
  }

  private async fetchTranslation(
    text: string,
    targetLang: string,
  ): Promise<string> {
    const url = 'http://localhost:5001/translate';
    const payload = {
      q: text,
      source: 'auto',
      target: targetLang,
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload),
      );
      return response.data.translatedText;
    } catch (error) {
      console.log('Error translating text: ' + error.message);
      return text;
    }
  }
}
