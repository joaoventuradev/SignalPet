import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('api/translate')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  async translate(
    @Body() body: { id: string; text: string; targetLang: string },
  ) {
    const { id, text, targetLang } = body;

    const supportedLanguages = ['en', 'de', 'es', 'fr', 'pt'];
    if (!supportedLanguages.includes(targetLang)) {
      throw new BadRequestException(
        `Language '${targetLang}' is not supported.`,
      );
    }
    return {
      translatedText: await this.translationService.translateText(
        id,
        text,
        targetLang,
      ),
    };
  }
}
