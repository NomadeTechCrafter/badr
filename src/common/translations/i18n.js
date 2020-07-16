import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import fr from './fr/index';

/**
  1) Import all translation modules imports
 */
import loginTranslations from '../../hab/login/i18n/loginTranslate';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
/**
  2) Add here all translation modules imports
 */
let combined = {...fr, ...loginTranslations};
I18n.translations = {
  fr: combined,
};

//export default I18n;

export function translate(key, option) {
  return I18n.t(key, option);
}

export default translate;
