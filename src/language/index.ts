import { createI18n } from "vue-i18n";
import { LANGUAGE, language_map, messages } from "./language";
import { Locale } from "vant";
import enUs from "vant/es/locale/lang/en-US";
import idID from "vant/es/locale/lang/id-ID";
import thTH from "vant/es/locale/lang/th-TH";
import viVN from "vant/es/locale/lang/vi-VN";
import ptBR from "vant/es/locale/lang/pt-BR";
Locale.use("en-US", enUs);
export const i18n = createI18n({
  locale: language_map[LANGUAGE.India],
  fallbackLocale: language_map[LANGUAGE.India],
  messages: messages,
  legacy: false,
});

export function setVantLanguage(langId: LANGUAGE) {
  switch (langId) {
    case LANGUAGE.India:
      Locale.use("en-Us", enUs);
      break;
    case LANGUAGE.Thai:
      Locale.use("th-TH", thTH);
      break;
    case LANGUAGE.Vietnamese:
      Locale.use("vi-VN", viVN);
      break;
    case LANGUAGE.Brazilian:
      Locale.use("pt-BR", ptBR);
      break;
    case LANGUAGE.Indonesian:
      Locale.use("id-ID", idID);
      break;
    default:
      Locale.use("en-Us", enUs);
      break;
  }
}
