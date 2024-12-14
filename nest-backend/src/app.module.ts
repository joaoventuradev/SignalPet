import { Module } from '@nestjs/common';
import { TranslationModule } from './translations/translation.module';

@Module({
  imports: [TranslationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
