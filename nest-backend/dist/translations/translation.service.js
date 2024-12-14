"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let TranslationService = class TranslationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.cache = new Map();
    }
    async translateText(id, text, targetLang) {
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
    async fetchTranslation(text, targetLang) {
        const url = 'http://localhost:5001/translate';
        const payload = {
            q: text,
            source: 'auto',
            target: targetLang,
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, payload));
            return response.data.translatedText;
        }
        catch (error) {
            console.log('Error translating text: ' + error.message);
            return text;
        }
    }
};
exports.TranslationService = TranslationService;
exports.TranslationService = TranslationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TranslationService);
//# sourceMappingURL=translation.service.js.map